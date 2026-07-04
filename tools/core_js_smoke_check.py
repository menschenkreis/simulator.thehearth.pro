#!/usr/bin/env python3
"""Run a small behavior check against the browser-compatible core modules."""

from __future__ import annotations

import shutil
import subprocess
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]


def main() -> int:
    if not shutil.which("osascript"):
        print("Core JS smoke check skipped: osascript is not available.")
        return 0

    script = f"""
ObjC.import('Foundation');

function readText(path) {{
  var text = $.NSString.stringWithContentsOfFileEncodingError(
    path,
    $.NSUTF8StringEncoding,
    null
  );
  return ObjC.unwrap(text);
}}

function assert(condition, message) {{
  if (!condition) {{
    throw new Error(message);
  }}
}}

var root = {str(ROOT)!r};
eval(readText(root + "/core/renderer-registry.js"));
eval(readText(root + "/adapters/action-renderer-registry-bootstrap.js"));
eval(readText(root + "/core/foundation-adapter.js"));
eval(readText(root + "/adapters/foundation-route-manifest-runtime.js"));
eval(readText(root + "/adapters/foundation-action-renderers.js"));
eval(readText(root + "/core/lesson-view-model.js"));
eval(readText(root + "/core/lesson-session.js"));
eval(readText(root + "/core/learner-progress.js"));
eval(readText(root + "/adapters/browser-progress-store.js"));
eval(readText(root + "/adapters/teaching-engine-core-adapter.js"));

var seed = JSON.parse(readText(root + "/database-blueprint/seeds/foundation_conversations_lesson_v2.json"));
var foundationManifest = JSON.parse(readText(root + "/core/foundation-route-manifest.json"));

assert(
  JSON.stringify(HearthFoundationRouteManifest.routes) === JSON.stringify(foundationManifest.routes),
  "runtime Foundation manifest should match core JSON manifest"
);
var musicRoute = HearthFoundationAdapter.findRouteByTopic(HearthFoundationRouteManifest, "f-music-language");
assert(musicRoute.lesson_id === "f-learning-a-language", "Foundation adapter should map topic to clean lesson id");

var registry = HearthRendererRegistry.createRegistry();
registry.register("foundation.fake_renderer", function(context) {{
  return "rendered:" + context.step.type;
}});
assert(registry.has("foundation.fake_renderer"), "renderer registry should register keys");
assert(registry.render("foundation.fake_renderer", {{ step: {{ type: "action" }} }}) === "rendered:action", "renderer registry should call renderer");
assert(HearthActionRendererRegistry.keys().length === 0, "bootstrap should create an empty shared registry");

var fakeFoundationLesson = {{ steps: [] }};
[4, 12, 15, 18].forEach(function(order) {{
  fakeFoundationLesson.steps[order - 1] = {{
    type: "action",
    render: function(container, advance) {{
      container.called = order;
      if (advance) advance();
      return order;
    }}
  }};
}});
var foundationRendererRegistry = HearthRendererRegistry.createRegistry();
HearthFoundationActionRenderers.registerLegacyFoundationActionRenderers(
  fakeFoundationLesson,
  foundationRendererRegistry
);
assert(foundationRendererRegistry.keys().length === 4, "Foundation action adapter should register four renderers");
var fakeContainer = {{}};
var didAdvance = false;
foundationRendererRegistry.render("foundation.body_scan", {{
  container: fakeContainer,
  advance: function() {{ didAdvance = true; }}
}});
assert(fakeContainer.called === 4, "Foundation body scan renderer should call source action");
assert(didAdvance === true, "Foundation action wrapper should pass advance callback");

var viewModel = HearthLessonViewModel.buildLessonViewModel(seed, {{ current_step_index: 2 }});
assert(viewModel.id === "f-conversations", "view model lesson id mismatch");
assert(viewModel.current_step.type === "ask", "view model current step should be ask");
assert(viewModel.next_step_index === 3, "view model next step mismatch");

var session = HearthLessonSession.createLessonSession(seed, {{ step_index: 2 }});
var wrong = HearthLessonSession.evaluateChoice(seed, session, 1);
assert(wrong.result.valid === true, "wrong choice should be valid");
assert(wrong.result.correct === false, "wrong choice should be incorrect");
assert(wrong.result.next_action === "reexplain", "wrong choice should reexplain");
assert(wrong.state.scores["interval-melody"].wrong === 1, "wrong score not tracked");

var correct = HearthLessonSession.evaluateChoice(seed, wrong.state, 0);
assert(correct.result.correct === true, "correct choice should be correct");
assert(correct.result.next_action === "show_response", "correct choice should show response");
assert(correct.state.scores["interval-melody"].right === 1, "right score not tracked");

var advanced = HearthLessonSession.advanceLesson(seed, correct.state);
assert(advanced.step_index === 3, "advance should move one step forward");
assert(advanced.history.length === 1, "advance should remember previous step");

var progress = HearthLearnerProgress.createProgressRecord({{ now: "2026-07-04T00:00:00.000Z" }});
progress = HearthLearnerProgress.markLessonStarted(progress, "f-conversations", {{ now: "2026-07-04T00:01:00.000Z" }});
progress = HearthLearnerProgress.updateLessonStep(progress, "f-conversations", 3, {{ now: "2026-07-04T00:02:00.000Z" }});
progress = HearthLearnerProgress.recordLessonAnswer(progress, "f-conversations", "interval-melody", false, {{ now: "2026-07-04T00:03:00.000Z" }});
progress = HearthLearnerProgress.markLessonCompleted(progress, "f-conversations", {{ now: "2026-07-04T00:04:00.000Z" }});
var lessonProgress = HearthLearnerProgress.getLessonProgress(progress, "f-conversations");
assert(lessonProgress.status === "completed", "progress should mark lesson completed");
assert(lessonProgress.last_step_index === 3, "progress should keep last step");
assert(lessonProgress.wrong_answers === 1, "progress should track wrong answers");
assert(HearthLearnerProgress.summarizeProgress(progress).completed_count === 1, "progress summary mismatch");

var fakeStorage = {{
  values: {{}},
  getItem: function(key) {{
    return this.values[key] || null;
  }},
  setItem: function(key, value) {{
    this.values[key] = String(value);
  }},
  removeItem: function(key) {{
    delete this.values[key];
  }}
}};
var store = HearthBrowserProgressStore.createBrowserProgressStore({{
  progressCore: HearthLearnerProgress,
  storage: fakeStorage,
  storage_key: "test.progress"
}});
store.markLessonStarted("f-conversations", {{ now: "2026-07-04T00:05:00.000Z" }});
store.updateLessonStep("f-conversations", 4, {{ now: "2026-07-04T00:06:00.000Z" }});
var storedProgress = store.load();
assert(storedProgress.lessons["f-conversations"].status === "in_progress", "adapter should save progress");
assert(storedProgress.lessons["f-conversations"].last_step_index === 4, "adapter should save last step");
store.clear();
assert(store.load().lessons["f-conversations"] === undefined, "adapter should clear progress");

var controllerStore = HearthBrowserProgressStore.createBrowserProgressStore({{
  progressCore: HearthLearnerProgress,
  storage: fakeStorage,
  storage_key: "controller.progress"
}});
var controller = HearthTeachingEngineCoreAdapter.createTeachingLessonController({{
  seed: seed,
  progressStore: controllerStore
}});
controller.start({{ now: "2026-07-04T00:07:00.000Z" }});
var controllerState = controller.goToStep(2, {{ now: "2026-07-04T00:08:00.000Z" }});
assert(controllerState.view_model.current_step.type === "ask", "controller should expose ask view model");
var controllerAnswer = controller.answerChoice(1, {{ now: "2026-07-04T00:09:00.000Z" }});
assert(controllerAnswer.result.next_action === "reexplain", "controller should evaluate wrong answer");
var controllerProgress = controllerStore.load();
assert(controllerProgress.lessons["f-conversations"].wrong_answers === 1, "controller should record answer progress");

var directLessonController = HearthTeachingEngineCoreAdapter.createTeachingLessonController({{
  seed: seed.lesson
}});
var directLessonState = directLessonController.goToStep(2);
assert(directLessonState.lesson_id === "f-conversations", "controller should accept direct lesson objects");
assert(directLessonState.view_model.current_step.type === "ask", "direct lesson controller should expose current step");

"Core JS smoke check passed.";
"""

    result = subprocess.run(
        ["osascript", "-l", "JavaScript", "-e", script],
        check=False,
        capture_output=True,
        text=True,
    )

    if result.returncode != 0:
        print(result.stderr.strip() or result.stdout.strip())
        return result.returncode

    print(result.stdout.strip())
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
