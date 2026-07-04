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
eval(readText(root + "/core/lesson-core.js"));
eval(readText(root + "/core/renderer-registry.js"));
eval(readText(root + "/adapters/action-renderer-registry-bootstrap.js"));
eval(readText(root + "/core/foundation-adapter.js"));
eval(readText(root + "/adapters/foundation-route-manifest-runtime.js"));
eval(readText(root + "/adapters/foundation-action-renderers.js"));
eval(readText(root + "/adapters/foundation-seed-loader.js"));
eval(readText(root + "/adapters/foundation-lesson-launcher.js"));
eval(readText(root + "/adapters/foundation-lesson-shell.js"));
eval(readText(root + "/adapters/foundation-ui-utils.js"));
eval(readText(root + "/adapters/rainbow-blocks-viewer.js"));
eval(readText(root + "/adapters/foundation-map-viewer.js"));
eval(readText(root + "/adapters/foundation-panel-controller.js"));
eval(readText(root + "/adapters/foundation-topic-viewer.js"));
eval(readText(root + "/adapters/foundation-topic-controller.js"));
eval(readText(root + "/adapters/foundation-audio.js"));
eval(readText(root + "/core/lesson-view-model.js"));
eval(readText(root + "/core/lesson-session.js"));
eval(readText(root + "/core/learner-progress.js"));
eval(readText(root + "/adapters/browser-progress-store.js"));
eval(readText(root + "/adapters/foundation-progress-bridge.js"));
eval(readText(root + "/adapters/teaching-engine-core-adapter.js"));
eval(readText(root + "/adapters/doing-ui-utils.js"));
eval(readText(root + "/adapters/doing-config.js"));
eval(readText(root + "/adapters/doing-drill-board-model.js"));
eval(readText(root + "/adapters/doing-drill-detail-viewer.js"));
eval(readText(root + "/adapters/doing-drill-board-viewer.js"));
eval(readText(root + "/adapters/doing-entry-viewer.js"));
eval(readText(root + "/adapters/doing-explorer-viewer.js"));
eval(readText(root + "/adapters/doing-explorer-controller.js"));
eval(readText(root + "/adapters/doing-map-viewer.js"));

var seed = JSON.parse(readText(root + "/database-blueprint/seeds/foundation_conversations_lesson_v2.json"));
var foundationManifest = JSON.parse(readText(root + "/core/foundation-route-manifest.json"));

assert(
  JSON.stringify(HearthFoundationRouteManifest.routes) === JSON.stringify(foundationManifest.routes),
  "runtime Foundation manifest should match core JSON manifest"
);
var musicRoute = HearthFoundationAdapter.findRouteByTopic(HearthFoundationRouteManifest, "f-music-language");
assert(musicRoute.lesson_id === "f-learning-a-language", "Foundation adapter should map topic to clean lesson id");

var normalizedSeedLesson = HearthFoundationSeedLoader.normalizeSeedForTeachingEngine(seed);
assert(normalizedSeedLesson.id === "f-conversations", "seed loader should keep lesson id");
assert(normalizedSeedLesson.completeText.indexOf("clean notes") !== -1, "seed loader should map complete_text");
assert(normalizedSeedLesson.steps[1].charSize === "big", "seed loader should map char_size");
assert(normalizedSeedLesson.steps[2].char.indexOf("Thinking") !== -1, "seed loader should map char_key");
assert(normalizedSeedLesson.steps[2].choices[0].response.char.indexOf("Celebratory") !== -1, "seed loader should map response char_key");
assert(
  HearthFoundationLessonLauncher.FALLBACK_LESSON_ID_BY_TOPIC_ID["f-first-conversation"] === "f-conversations",
  "Foundation launcher should expose clean fallback lesson ids"
);
var fakeShellTarget = {{
  innerHTML: "",
  querySelector: function(selector) {{
    return selector === "#teach-container" && this.innerHTML.indexOf("teach-container") !== -1
      ? {{ id: "teach-container" }}
      : null;
  }}
}};
var fakeTeachContainer = HearthFoundationLessonShell.renderFoundationLessonShell(fakeShellTarget, {{
  label: "TEST LABEL"
}});
assert(fakeShellTarget.innerHTML.indexOf("TEST LABEL") !== -1, "Foundation shell should render label");
assert(fakeTeachContainer.id === "teach-container", "Foundation shell should return teach container");
assert(HearthFoundationUiUtils.escapeHtml("<x>") === "&lt;x&gt;", "Foundation UI utils should escape HTML");
assert(HearthFoundationUiUtils.colorForIndex(0) === "#e74c3c", "Foundation UI utils should return stable colors");
var rainbowHtml = HearthRainbowBlocksViewer.renderRainbowBlocks([
  {{ id: "one", title: "One", done: true }},
  {{ id: "two", title: "Two", locked: true }}
], {{
  title: "Rainbow Test",
  sources: ["Source A"],
  clickFn: "openRainbow"
}});
assert(rainbowHtml.indexOf("Rainbow Test") !== -1, "rainbow blocks viewer should render title");
assert(rainbowHtml.indexOf("1/2 blocks") !== -1, "rainbow blocks viewer should count completed blocks");
assert(typeof rainbowBlocks === "function", "rainbow blocks viewer should keep legacy global helper");
assert(HearthDoingConfig.levelForDrill({{ id: "alt-1", difficulty: 8 }}) === 1, "Doing config should map known drill levels");
assert(HearthDoingConfig.levelForDrill({{ id: "unknown", difficulty: 9 }}) === 8, "Doing config should clamp fallback drill levels");
assert(HearthDoingConfig.coachForCategory("picking").whatDo.indexOf("pick") !== -1, "Doing config should return category coaching");
assert(HearthDoingConfig.coachForCategory("missing").pass.indexOf("dead notes") !== -1, "Doing config should fall back to fretting coaching");
assert(HearthDoingConfig.guitarZones.length === 6, "Doing config should expose guitar map zones");
assert(HearthDoingConfig.focusCats.length === 6, "Doing config should expose focus categories");
assert(HearthDoingUiUtils.escapeHtml("<pick>") === "&lt;pick&gt;", "Doing UI utils should escape HTML");
assert(HearthDoingUiUtils.drillShort({{ title: "Alternate Picking" }}) === "AP", "Doing UI utils should build drill initials");
var fakeDoing = {{
  categories: [
    {{
      id: "picking",
      title: "Picking",
      drills: [
        {{ id: "alt-1", title: "Alternate Picking", style: "rock", source: "Test", difficulty: 8 }},
        {{ id: "funk-1", title: "Funk Grid", style: "funk", source: "Test", difficulty: 1 }}
      ]
    }}
  ]
}};
var fakeBoardOptions = {{
  doing: fakeDoing,
  config: HearthDoingConfig,
  activeStyle: "rock",
  activeLevel: "all",
  activeSearch: ""
}};
assert(HearthDoingDrillBoardModel.countForGenre(fakeBoardOptions, "rock") === 1, "Doing board model should count genre drills");
assert(HearthDoingDrillBoardModel.findNextDrill(fakeDoing, {{}}, HearthDoingConfig.stateOrder).drill.id === "alt-1", "Doing board model should find next drill");
var doingBoardHtml = HearthDoingDrillBoardViewer.renderDoingDrillBoard({{
  doing: fakeDoing,
  config: HearthDoingConfig,
  ui: HearthDoingUiUtils,
  boardModel: HearthDoingDrillBoardModel,
  progress: {{ "alt-1": "mastered" }},
  activeStyle: "all",
  activeLevel: "all",
  activeSearch: ""
}});
assert(doingBoardHtml.indexOf("doing-fretboard-stage") !== -1, "Doing board viewer should render board shell");
assert(doingBoardHtml.indexOf("1/2 mastered in view") !== -1, "Doing board viewer should render mastered count");
var doingDetailHtml = HearthDoingDrillDetailViewer.renderDoingDrillDetail({{
  cat: fakeDoing.categories[0],
  drill: fakeDoing.categories[0].drills[0],
  level: HearthDoingConfig.levels[0],
  state: "mastered",
  config: HearthDoingConfig,
  ui: HearthDoingUiUtils
}});
assert(doingDetailHtml.indexOf("doing-drill-card") !== -1, "Doing detail viewer should render detail card");
assert(doingDetailHtml.indexOf("Alternate Picking") !== -1, "Doing detail viewer should render drill title");
assert(doingDetailHtml.indexOf("Pass condition") !== -1, "Doing detail viewer should render coaching sections");
var doingEntryHtml = HearthDoingEntryViewer.renderDoingEntry({{
  focusCats: HearthDoingConfig.focusCats,
  nextDrill: {{ cat: fakeDoing.categories[0], drill: fakeDoing.categories[0].drills[0] }},
  levels: HearthDoingConfig.levels,
  config: HearthDoingConfig,
  ui: HearthDoingUiUtils
}});
assert(doingEntryHtml.indexOf("doing-calm") !== -1, "Doing entry viewer should render entry shell");
assert(doingEntryHtml.indexOf("Recommended next") !== -1, "Doing entry viewer should render recommendation");
assert(doingEntryHtml.indexOf("Open Training Map") !== -1, "Doing entry viewer should render map action");
var doingExplorerHtml = HearthDoingExplorerViewer.renderDoingExplorer({{
  activeTab: "notes"
}});
assert(doingExplorerHtml.indexOf("doing-explore") !== -1, "Doing explorer viewer should render explorer shell");
assert(doingExplorerHtml.indexOf("exp-fretboard-svg") !== -1, "Doing explorer viewer should render note locator");
assert(
  HearthDoingExplorerViewer.renderDoingExplorer({{ activeTab: "tab" }}).indexOf("Tab + Notation") !== -1,
  "Doing explorer viewer should render tab panel"
);
assert(HearthDoingExplorerController.noteFromMidi(40) === "E", "Doing explorer controller should map MIDI notes");
assert(
  HearthDoingExplorerController.positionsForNote("E").indexOf("E fret 0") !== -1,
  "Doing explorer controller should find note positions"
);
assert(
  HearthDoingExplorerController.renderFretboardSvg("E").indexOf("#d4af69") !== -1,
  "Doing explorer controller should render highlighted fretboard SVG"
);
var doingMapHtml = HearthDoingMapViewer.renderDoingMap({{
  zones: HearthDoingConfig.guitarZones,
  doingDebug: true
}});
assert(doingMapHtml.indexOf("doing-map-wrap") !== -1, "Doing map viewer should render map shell");
assert(doingMapHtml.indexOf("doing-map-zone debug") !== -1, "Doing map viewer should render debug zones");
assert(typeof HearthDoingMapViewer.showDoingBubble === "function", "Doing map viewer should expose bubble helper");
var fakeMapTarget = {{ innerHTML: "" }};
var fakeMapFoundation = {{
  guideLine: "Guide line",
  topics: [
    {{ id: "f-threshold" }},
    {{ id: "f-how-to-learn" }},
    {{ id: "f-learning-a-language" }}
  ]
}};
var fakeMapResult = HearthFoundationMapViewer.renderFoundationMap({{
  foundation: fakeMapFoundation,
  targetEl: fakeMapTarget,
  completed: {{ "f-threshold": true }}
}});
assert(fakeMapResult.done_count === 1, "Foundation map viewer should count completed frets");
assert(fakeMapResult.active_index === 1, "Foundation map viewer should choose first incomplete fret");
assert(fakeMapTarget.innerHTML.indexOf("found-neck-wrap") !== -1, "Foundation map viewer should render map shell");
var fakePanelTarget = {{
  innerHTML: "",
  classList: {{
    added: "",
    add: function(name) {{ this.added = name; }}
  }}
}};
var fakeHiddenPanel = {{
  classList: {{
    removed: "",
    remove: function(name) {{ this.removed = name; }}
  }}
}};
globalThis.document = {{
  querySelectorAll: function(selector) {{
    return selector === ".pnl" ? [fakeHiddenPanel] : [];
  }},
  getElementById: function(id) {{
    return id === "p-foundation" ? fakePanelTarget : null;
  }}
}};
globalThis.localStorage = {{
  getItem: function() {{ return "{{}}"; }}
}};
globalThis.FOUNDATION = fakeMapFoundation;
var fakePanelResult = HearthFoundationPanelController.showFoundation();
assert(fakePanelResult.fret_count === 3, "Foundation panel controller should render map through map viewer");
assert(fakePanelTarget.classList.added === "on", "Foundation panel controller should show panel");
var fakeTopicTarget = {{ innerHTML: "" }};
var fakeFoundation = {{
  tag: "TEST",
  topics: [
    {{
      id: "f-test",
      num: "0",
      title: "Test Topic",
      subtitle: "Testing",
      steps: [
        {{ label: "Understand", title: "Test Step", body: "<p>Body</p>" }},
        {{ label: "Own", title: "Done", body: "<p>Done</p>" }}
      ]
    }}
  ]
}};
var fakeTopicResult = HearthFoundationTopicViewer.renderFoundationTopicStep({{
  foundation: fakeFoundation,
  targetEl: fakeTopicTarget,
  topicId: "f-test",
  stepIndex: 0,
  completed: {{}}
}});
assert(fakeTopicResult.topic_id === "f-test", "Foundation topic viewer should return topic id");
assert(fakeTopicTarget.innerHTML.indexOf("foundation-topic-page") !== -1, "Foundation topic viewer should render page shell");
assert(fakeTopicTarget.innerHTML.indexOf("Test Topic") !== -1, "Foundation topic viewer should render topic title");
var fakeControllerTarget = {{ innerHTML: "" }};
globalThis.document = {{
  getElementById: function(id) {{
    return id === "p-foundation" ? fakeControllerTarget : null;
  }}
}};
globalThis.localStorage = {{
  getItem: function() {{ return "{{}}"; }}
}};
globalThis.FOUNDATION = fakeFoundation;
var fakeControllerResult = HearthFoundationTopicController.renderFoundationTopicStep("f-test", 0);
assert(fakeControllerResult.topic_id === "f-test", "Foundation topic controller should delegate fallback rendering");
assert(fakeControllerTarget.innerHTML.indexOf("foundation-topic-page") !== -1, "Foundation topic controller should render fallback page");
assert(typeof HearthFoundationAudio.playTone === "function", "Foundation audio adapter should expose playTone");
assert(typeof _l1_playTone === "function", "Foundation audio adapter should keep legacy helper name");

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

var progressBridgeStorage = {{
  values: {{}},
  getItem: function(key) {{ return this.values[key] || null; }},
  setItem: function(key, value) {{ this.values[key] = String(value); }},
  removeItem: function(key) {{ delete this.values[key]; }}
}};
var progressBridgeResult = HearthFoundationProgressBridge.markFoundationLessonCompleted(
  "f-first-conversation",
  {{ lesson_id: "f-conversations" }},
  {{ storage: progressBridgeStorage, now: "2026-07-04T00:10:00.000Z" }}
);
var legacyProgress = JSON.parse(progressBridgeStorage.values["hearth-foundation-progress"]);
var cleanProgress = JSON.parse(progressBridgeStorage.values["hearth.cleanProgress.v1"]);
assert(progressBridgeResult.lesson_id === "f-conversations", "progress bridge should return lesson id");
assert(legacyProgress["f-first-conversation"] === true, "progress bridge should write legacy topic progress");
assert(cleanProgress.lessons["f-conversations"].status === "completed", "progress bridge should write clean progress");
HearthFoundationProgressBridge.markFoundationTopicCompleted("f-threshold", {{
  storage: progressBridgeStorage
}});
legacyProgress = JSON.parse(progressBridgeStorage.values["hearth-foundation-progress"]);
assert(legacyProgress["f-threshold"] === true, "progress bridge should write fallback topic progress");

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
