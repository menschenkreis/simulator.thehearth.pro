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
eval(readText(root + "/adapters/doing-controls-controller.js"));
eval(readText(root + "/adapters/doing-drill-adjust-controller.js"));
eval(readText(root + "/adapters/doing-drill-preview-controller.js"));
eval(readText(root + "/adapters/doing-drill-detail-viewer.js"));
eval(readText(root + "/adapters/doing-drill-board-viewer.js"));
eval(readText(root + "/adapters/doing-shell-viewer.js"));
eval(readText(root + "/adapters/doing-entry-viewer.js"));
eval(readText(root + "/adapters/doing-explorer-viewer.js"));
eval(readText(root + "/adapters/doing-explorer-controller.js"));
eval(readText(root + "/adapters/doing-map-viewer.js"));
eval(readText(root + "/adapters/doing-map-controller.js"));
eval(readText(root + "/adapters/doing-panel-controller.js"));
eval(readText(root + "/adapters/knowing-level-model.js"));
eval(readText(root + "/adapters/knowing-shelf-viewer.js"));
eval(readText(root + "/adapters/knowing-shelf-controller.js"));
eval(readText(root + "/adapters/knowing-book-viewer.js"));
eval(readText(root + "/adapters/knowing-topic-viewer.js"));
eval(readText(root + "/adapters/knowing-progress-controller.js"));
eval(readText(root + "/adapters/knowing-panel-controller.js"));
eval(readText(root + "/adapters/knowing-study-model.js"));
eval(readText(root + "/adapters/knowing-study-dashboard-viewer.js"));
eval(readText(root + "/adapters/knowing-study-question-model.js"));
eval(readText(root + "/adapters/knowing-study-session-model.js"));
eval(readText(root + "/adapters/knowing-study-session-viewer.js"));
eval(readText(root + "/adapters/knowing-study-quiz-controller.js"));
eval(readText(root + "/adapters/practice-state.js"));
eval(readText(root + "/adapters/practice-guide-model.js"));
eval(readText(root + "/adapters/practice-dashboard-viewer.js"));
eval(readText(root + "/adapters/practice-drill-viewer.js"));
eval(readText(root + "/adapters/practice-session-model.js"));
eval(readText(root + "/adapters/practice-session-viewer.js"));
eval(readText(root + "/adapters/practice-ui-utils.js"));
eval(readText(root + "/adapters/practice-metronome-controller.js"));
eval(readText(root + "/adapters/play-world-viewer.js"));
eval(readText(root + "/adapters/mastery-viewer.js"));
eval(readText(root + "/adapters/create-cauldron-model.js"));
eval(readText(root + "/adapters/create-cauldron-viewer.js"));
eval(readText(root + "/adapters/create-cauldron-controller.js"));
eval(readText(root + "/adapters/text-to-speech-controller.js"));
eval(readText(root + "/adapters/header-tools-controller.js"));
eval(readText(root + "/adapters/references-panel-controller.js"));
eval(readText(root + "/adapters/link-deposit-controller.js"));
eval(readText(root + "/adapters/recorder-controller.js"));
eval(readText(root + "/adapters/notebook-controller.js"));
eval(readText(root + "/adapters/dictionary-controller.js"));

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
assert(
  HearthDoingControlsController.stateForFocus("fretboard", HearthDoingConfig.focusCats).doingView === "explorer",
  "Doing controls controller should route fretboard focus to explorer"
);
assert(
  HearthDoingControlsController.stateForQuickLink("open-map").doingView === "training",
  "Doing controls controller should route map quick link to training"
);
assert(
  HearthDoingDrillAdjustController.messageForAdjustment("easier").indexOf("slowing the BPM") !== -1,
  "Doing drill adjust controller should return easier message"
);
assert(
  HearthDoingDrillPreviewController.findDrill(fakeDoing, "picking", "alt-1").drill.title === "Alternate Picking",
  "Doing drill preview controller should find drill records"
);
var doingPreviewHtml = HearthDoingDrillPreviewController.renderPreviewHtml({{
  cat: fakeDoing.categories[0],
  drill: fakeDoing.categories[0].drills[0],
  stateLabel: "Mastered",
  level: 1,
  ui: HearthDoingUiUtils
}});
assert(doingPreviewHtml.indexOf("Alternate Picking") !== -1, "Doing drill preview controller should render title");
assert(doingPreviewHtml.indexOf("Mastered") !== -1, "Doing drill preview controller should render state label");
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
var doingShellHtml = HearthDoingShellViewer.renderDoingShell({{
  doing: {{ title: "Doing Test", subtitle: "Practice test" }},
  ui: HearthDoingUiUtils,
  progressSummary: {{ mastered: 1, touched: 2 }},
  contentHtml: '<div id="doing-fretboard">Inner</div>'
}});
assert(doingShellHtml.indexOf("doing-shell") !== -1, "Doing shell viewer should render shell wrapper");
assert(doingShellHtml.indexOf("Doing Test") !== -1, "Doing shell viewer should render title");
assert(doingShellHtml.indexOf("doing-fretboard") !== -1, "Doing shell viewer should include inner content");
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
assert(
  HearthDoingMapController.stateForZone({{ view: "explorer" }}).activeExpTab === "notes",
  "Doing map controller should route explorer zones to notes tab"
);
var doingPanelState = {{ doingView: "map", activeSearch: "" }};
HearthDoingPanelController.applyState(doingPanelState, {{ doingView: "training", activeSearch: "pick" }});
assert(doingPanelState.doingView === "training", "Doing panel controller should apply view state");
assert(doingPanelState.activeSearch === "pick", "Doing panel controller should apply search state");
var fakeKnowing = {{
  categories: [
    {{
      id: "rhythm",
      title: "Rhythm",
      topics: [
        {{ id: "pulse", title: "Pulse", source: "QJam L1", difficulty: 1, body: "<p><strong>Pulse</strong> anchors <strong>rhythm</strong>.</p>" }},
        {{ id: "sync", title: "Syncopation", source: "QJam L2", difficulty: 2 }}
      ]
    }}
  ]
}};
var knowingLevels = HearthKnowingLevelModel.buildLevels(fakeKnowing, {{ pulse: true }});
assert(knowingLevels.length === 8, "Knowing level model should create eight levels");
assert(knowingLevels[0].totalTopics === 1, "Knowing level model should count level topics");
assert(knowingLevels[0].totalDone === 1, "Knowing level model should count completed topics");
assert(HearthKnowingLevelModel.recommendedLevel(knowingLevels) === 2, "Knowing level model should recommend next shelf");
var knowingShelfHtml = HearthKnowingShelfViewer.renderKnowingShelf({{
  knowing: fakeKnowing,
  levels: knowingLevels,
  recommendedLevel: 2
}});
assert(knowingShelfHtml.indexOf("knowing-shelf-scene") !== -1, "Knowing shelf viewer should render shelf scene");
assert(knowingShelfHtml.indexOf("showKnowingBook") !== -1, "Knowing shelf viewer should render book action");
var knowingBookHtml = HearthKnowingBookViewer.renderKnowingBook({{
  knowing: fakeKnowing,
  cat: fakeKnowing.categories[0],
  completed: {{ pulse: true }}
}});
assert(knowingBookHtml.indexOf("Back to shelf") !== -1, "Knowing book viewer should render back action");
assert(knowingBookHtml.indexOf("showKnowingTopic") !== -1, "Knowing book viewer should render topic action");
var knowingTopicHtml = HearthKnowingTopicViewer.renderKnowingTopic({{
  knowing: fakeKnowing,
  cat: fakeKnowing.categories[0],
  topic: fakeKnowing.categories[0].topics[0],
  completed: {{ pulse: true }}
}});
assert(knowingTopicHtml.indexOf("Back to Rhythm") !== -1, "Knowing topic viewer should render book back action");
assert(knowingTopicHtml.indexOf("Mark as understood") === -1, "Knowing topic viewer should reflect completed topic");
assert(
  HearthKnowingTopicViewer.nextTopicFor(fakeKnowing.categories[0], fakeKnowing.categories[0].topics[0]).id === "sync",
  "Knowing topic viewer should find next topic"
);
var fakeKnowingStorage = {{
  value: "{{}}",
  getItem: function() {{ return this.value; }},
  setItem: function(key, value) {{ this.value = value; }}
}};
HearthKnowingProgressController.markTopic({{ topicId: "pulse", storage: fakeKnowingStorage }});
assert(
  HearthKnowingProgressController.readProgress(fakeKnowingStorage).pulse === true,
  "Knowing progress controller should mark topic complete"
);
assert(typeof HearthKnowingPanelController.showKnowing === "function", "Knowing panel controller should expose showKnowing");
assert(
  HearthKnowingPanelController.readProgress(fakeKnowingStorage).pulse === true,
  "Knowing panel controller should read progress through progress controller"
);
var studyState = HearthKnowingStudyModel.dashboardState(fakeKnowing, {{ pulse: true }}, {{}}, {{ pulse: {{ passed: true }} }});
assert(studyState.summary.doneTopics === 1, "Knowing study model should count completed topics");
assert(studyState.summary.quizPassed === 1, "Knowing study model should count passed quizzes");
assert(studyState.currentTopic.id === "sync", "Knowing study model should choose first incomplete topic");
var studyDashboardHtml = HearthKnowingStudyDashboardViewer.renderStudyDashboard({{ knowing: fakeKnowing, completed: {{ pulse: true }}, studyState: studyState }});
assert(studyDashboardHtml.indexOf("Study Lab") >= 0, "Knowing study dashboard viewer should render title");
assert(studyDashboardHtml.indexOf("sync") >= 0, "Knowing study dashboard viewer should render next topic action");
var studyQuestions = HearthKnowingStudyQuestionModel.generateQuestions(fakeKnowing.categories[0].topics[0]);
assert(studyQuestions.length === 4, "Knowing study question model should build term and reflection questions");
assert(studyQuestions[0].correct >= 0, "Knowing study question model should track correct term option");
var studySession = HearthKnowingStudySessionModel.topicContext(fakeKnowing, "rhythm", "pulse", {{ pulse: true }});
assert(studySession.nextTopic.id === "sync", "Knowing study session model should find next topic");
assert(studySession.isDone === true, "Knowing study session model should read completed topic");
var studySessionHtml = HearthKnowingStudySessionViewer.renderStudySession({{ session: studySession, questions: studyQuestions }});
assert(studySessionHtml.indexOf("DEEPEN YOUR UNDERSTANDING") >= 0, "Knowing study session viewer should render quiz section");
assert(studySessionHtml.indexOf("HOW WELL DO YOU UNDERSTAND THIS?") >= 0, "Knowing study session viewer should render self assessment");
var studyOutcome = HearthKnowingStudySessionModel.assessmentOutcome(studySession, "nailed");
assert(studyOutcome.markComplete === true, "Knowing study session model should mark nailed topics complete");
var studyOutcomeHtml = HearthKnowingStudySessionViewer.renderAssessmentResult({{ session: studySession, outcome: studyOutcome }});
assert(studyOutcomeHtml.indexOf("Understood!") >= 0, "Knowing study session viewer should render assessment result");
var studyQuizScore = HearthKnowingStudyQuizController.scoreResult({{ correct: 3, total: 3 }}, 4);
assert(studyQuizScore.passed === true, "Knowing study quiz controller should pass scores at 75 percent");
assert(typeof _answerQuiz === "function", "Knowing study quiz controller should bind answer global");
var fakePractice = {{ drills: [
  {{ id: "warm", title: "Warmup", category: "Hands" }},
  {{ id: "scale", title: "Scale", category: "Scales" }}
] }};
assert(HearthPracticeState.categories(fakePractice).length === 3, "Practice state should list all drill categories");
assert(HearthPracticeState.preferences({{ altarTime: 10 }}).time === 10, "Practice state should read saved time preference");
assert(HearthPracticeState.nextDrill(fakePractice, "Scales", {{ completed: {{}} }}).id === "scale", "Practice state should choose next focused drill");
assert(HearthPracticeGuideModel.guideText({{ time: 5, focus: "All" }}, [], null).indexOf("Five minutes") === 0, "Practice guide model should guide short sessions");
assert(HearthPracticeGuideModel.guideText({{ time: 20, focus: "All" }}, [{{ feeling: "stuck" }}], null).indexOf("Last time was a wall") === 0, "Practice guide model should respond to last session");
assert(HearthPracticeGuideModel.drillGuideText({{ category: "Scales" }}).indexOf("Scales are not exercises") === 0, "Practice guide model should guide drill categories");
var practiceDashboardHtml = HearthPracticeDashboardViewer.renderPracticeDashboard({{
  categories: ["All", "Scales"],
  completedCount: 1,
  guide: "Begin with Scale.",
  nextDrill: fakePractice.drills[1],
  prefs: {{ time: 10, focus: "Scales" }},
  stats: {{ streak: 2, totalMinutes: 30, totalSessions: 3 }},
  timeChoices: [5, 10],
  visibleDrills: fakePractice.drills
}});
assert(practiceDashboardHtml.indexOf("Practice Temple") >= 0, "Practice dashboard viewer should render title");
assert(practiceDashboardHtml.indexOf("Light Candle") >= 0, "Practice dashboard viewer should render start action");
var practiceDrillHtml = HearthPracticeDrillViewer.renderPracticeDrill({{
  candleColor: "#e8a020",
  done: true,
  drill: fakePractice.drills[1],
  drillGuide: "Scales guide",
  prevAttempts: []
}});
assert(practiceDrillHtml.indexOf("HOW TO PRACTICE") >= 0, "Practice drill viewer should render instructions section");
assert(practiceDrillHtml.indexOf("MASTERED") >= 0, "Practice drill viewer should render completed state");
var practiceSessionHtml = HearthPracticeSessionViewer.renderPracticeSession({{
  candleColor: "#e8a020",
  drill: fakePractice.drills[1],
  sessionMinutes: 10,
  startBpm: 80
}});
assert(practiceSessionHtml.indexOf("Candle Practice") >= 0, "Practice session viewer should render title");
assert(practiceSessionHtml.indexOf("METRONOME") >= 0, "Practice session viewer should render metronome");
var practiceFinishOutcome = HearthPracticeSessionModel.finishOutcome(fakePractice, fakePractice.drills[0], "nailed");
assert(practiceFinishOutcome.markComplete === true, "Practice session model should mark nailed drills complete");
assert(practiceFinishOutcome.nextDrill.id === "scale", "Practice session model should choose following drill");
var practiceFinishHtml = HearthPracticeSessionViewer.renderFinishResult({{
  bpm: 80,
  candleColor: "#e8a020",
  drill: fakePractice.drills[0],
  minutes: 10,
  outcome: practiceFinishOutcome
}});
assert(practiceFinishHtml.indexOf("Nailed it!") >= 0, "Practice session viewer should render finish message");
var todayIso = new Date().toISOString();
assert(HearthPracticeUiUtils.calcStreak([{{ ts: todayIso }}]) === 1, "Practice UI utils should count today's streak");
assert(HearthPracticeUiUtils.feelingEmoji("getting") === "💪", "Practice UI utils should map feeling emoji");
var metroState = HearthPracticeMetronomeController.createState(80, 10, 1000);
assert(metroState.targetSeconds === 600, "Practice metronome controller should create timer state");
assert(HearthPracticeMetronomeController.clampBpm(500) === 220, "Practice metronome controller should cap BPM");
assert(HearthPracticeMetronomeController.timerState({{ timerStart: 1000, targetSeconds: 600 }}, 61000).text === "09:00", "Practice metronome controller should format remaining time");
var playWorldHtml = HearthPlayWorldViewer.renderPlayWorld([{{ id: "and", coords: [10, 20], color: "#fff" }}]);
assert(playWorldHtml.indexOf("World Map of Guitar") >= 0, "Play world viewer should render title");
assert(playWorldHtml.indexOf("wmClick('and')") >= 0, "Play world viewer should render hotspot action");
var playRegionHtml = HearthPlayWorldViewer.renderRegionDetail({{ id: "and", name: "Andes", tradition: "Andean Guitar", color: "#fff", description: "Mountain songs", keyArtists: ["A"], scales: ["S"], techniques: ["T"], listenTo: ["L"], learnFirst: "Start" }});
assert(playRegionHtml.indexOf("Andean Guitar") >= 0, "Play world viewer should render region detail");
assert(playRegionHtml.indexOf("Essential Listening") >= 0, "Play world viewer should render listening section");
var masteryHtml = HearthMasteryViewer.renderMastery({{ beyond: [{{ title: "Microtonal", artist: "Artist", tag: "Beyond", color: "#9b59b6", description: "Desc", why: "Why", listen: ["Listen"], reflect: "Reflect" }}] }});
assert(masteryHtml.indexOf("What Lies Beyond") >= 0, "Mastery viewer should render mastery title");
var mastersHtml = HearthMasteryViewer.renderMastersLibrary([{{ name: "Shai", instrument: "Piano", color: "#d4af69", description: "Desc", why: "Why", listen: ["Listen"], channel: "https://example.com" }}]);
assert(mastersHtml.indexOf("Watch Masters at Work") >= 0, "Mastery viewer should render masters library");
var cauldronHtml = HearthCreateCauldronViewer.renderCauldron({{ ingredients: [{{ id: "melody", symbol: "M", name: "Melody", color: "#c45a20" }}], savedNotes: "idea" }});
assert(cauldronHtml.indexOf("The Cauldron") >= 0, "Create cauldron viewer should render title");
assert(cauldronHtml.indexOf("cauldronToggle('melody')") >= 0, "Create cauldron viewer should render ingredient action");
var cauldronResult = HearthCreateCauldronModel.mixResult(
  [{{ id: "melody", symbol: "M", name: "Melody", color: "#c45a20", prompts: ["write a hook"] }}],
  [],
  ["melody"]
);
assert(cauldronResult.constraint === "Single ingredient: Melody", "Create cauldron model should mix one ingredient");
assert(cauldronResult.prompt === "write a hook", "Create cauldron model should pick ingredient prompt");
var cauldronResultHtml = HearthCreateCauldronViewer.renderMixResult(cauldronResult);
assert(cauldronResultHtml.indexOf("Single ingredient: Melody") >= 0, "Create cauldron viewer should render mix result");
assert(typeof HearthCreateCauldronController.syncSelectionUi === "function", "Create cauldron controller should expose selection sync");
var ttsText = HearthTextToSpeechController.readableText({{
  querySelectorAll: function() {{
    return [{{ textContent: "Hello ☐" }}, {{ textContent: "world" }}];
  }}
}});
assert(ttsText.indexOf("☐") === -1, "Text-to-speech controller should remove checkbox symbols");
assert(ttsText.indexOf("Hello") >= 0 && ttsText.indexOf("world") >= 0, "Text-to-speech controller should collect paragraph text");
var ttsVoice = HearthTextToSpeechController.preferredVoice([
  {{ name: "Other", lang: "en-US" }},
  {{ name: "Samantha", lang: "en-US" }}
]);
assert(ttsVoice.name === "Samantha", "Text-to-speech controller should choose preferred voices");
var headerSearchResults = HearthHeaderToolsController.collectSearchResults("scale", {{
  foundationTopics: [{{ title: "Threshold" }}],
  knowing: {{ categories: [{{ title: "Harmony", topics: [{{ title: "Major Scale" }}] }}] }},
  doing: {{ drills: [{{ title: "Scale Shapes" }}] }},
  playRegions: [{{ name: "Andes" }}]
}}, function() {{}});
assert(headerSearchResults.length === 2, "Header tools controller should collect matching search results");
assert(headerSearchResults[0].kind === "Concept Shelf" || headerSearchResults[0].kind === "Harmony", "Header search results should include result context");
assert(headerSearchResults[0].actionText.indexOf("Open") === 0, "Header search results should include an action cue");
var headerStorage = {{
  values: {{
    fProgress: JSON.stringify({{ a: true, b: true }}),
    dProgress: JSON.stringify({{ c: true }}),
    kProgress: JSON.stringify({{}}),
    streak: "3"
  }},
  getItem: function(key) {{ return this.values[key] || null; }},
  setItem: function(key, value) {{ this.values[key] = String(value); }}
}};
var headerCounts = HearthHeaderToolsController.progressCounts(headerStorage);
assert(headerCounts.foundation.done === 2, "Header tools controller should count Foundation progress");
assert(HearthHeaderToolsController.renderProgressHtml(headerCounts).indexOf("3 days") >= 0, "Header tools controller should render streak progress");
assert(HearthHeaderToolsController.renderProgressHtml(headerCounts).indexOf("Next best move") >= 0, "Header tools controller should render progress guidance");
assert(HearthHeaderToolsController.progressSummary(headerCounts).next.label === "Know", "Header tools controller should suggest weakest progress area");
function makeHeaderPanel(id) {{
  return {{
    id: id,
    classList: {{
      classes: {{}},
      contains: function(name) {{ return !!this.classes[name]; }},
      add: function(name) {{ this.classes[name] = true; }},
      remove: function(name) {{ delete this.classes[name]; }},
      toggle: function(name, force) {{
        var shouldShow = force === undefined ? !this.contains(name) : !!force;
        if (shouldShow) this.add(name);
        else this.remove(name);
        return shouldShow;
      }}
    }}
  }};
}}
var headerPanelIds = [
  "beatbot-panel",
  "insightPanel",
  "linkDepositPanel",
  "refsPanel",
  "searchPanel",
  "toolkitPanel",
  "progressPanel",
  "settingsPanel"
];
var headerElements = {{
  searchInput: {{ id: "searchInput", focused: false, focus: function() {{ this.focused = true; }} }}
}};
headerPanelIds.forEach(function(id) {{ headerElements[id] = makeHeaderPanel(id); }});
var headerDoc = {{
  getElementById: function(id) {{ return headerElements[id] || null; }}
}};
HearthHeaderToolsController.toggleSearch(headerDoc, function(fn) {{ fn(); }});
assert(headerElements.searchPanel.classList.contains("show"), "Header search panel should open");
assert(headerElements.searchInput.focused, "Header search panel should focus input when opened");
HearthHeaderToolsController.toggleProgress(headerDoc, function() {{}});
assert(!headerElements.searchPanel.classList.contains("show"), "Opening progress should close search");
assert(headerElements.progressPanel.classList.contains("show"), "Header progress panel should open");
HearthHeaderToolsController.toggleProgress(headerDoc, function() {{}});
assert(!headerElements.progressPanel.classList.contains("show"), "Clicking an open progress panel should close it");
headerElements.toolkitPanel.classList.add("show");
HearthHeaderToolsController.toggleSettings(headerDoc);
assert(!headerElements.toolkitPanel.classList.contains("show"), "Opening settings should close toolkit");
assert(headerElements.settingsPanel.classList.contains("show"), "Header settings panel should open");
HearthHeaderToolsController.closePanels(headerDoc, ["settingsPanel"]);
assert(headerElements.settingsPanel.classList.contains("show"), "Header closePanels should preserve kept panel");
var linkPanel = makeHeaderPanel("linkDepositPanel");
var linkKeepIds = null;
var linkDoc = {{
  getElementById: function(id) {{
    if (id === "linkDepositPanel") return linkPanel;
    if (id === "linkDepositUrl") return {{ focus: function() {{}} }};
    return null;
  }}
}};
HearthLinkDepositController.togglePanel({{
  document: linkDoc,
  delay: function(fn) {{ fn(); }},
  closePanels: function(keepIds) {{ linkKeepIds = keepIds; }}
}});
assert(linkKeepIds[0] === "linkDepositPanel", "Link deposit should ask header tools to keep its own panel open");
assert(linkPanel.classList.contains("show"), "Link deposit panel should open after closing siblings");
HearthLinkDepositController.togglePanel({{
  document: linkDoc,
  delay: function(fn) {{ fn(); }},
  closePanels: function() {{}}
}});
assert(!linkPanel.classList.contains("show"), "Clicking an open link deposit panel should close it");
var referencesHtml = HearthReferencesPanelController.renderReferencesHtml({{
  FOUNDATION: {{ sources: ["Source <A>"] }},
  DOING: {{ sources: [] }}
}});
assert(referencesHtml.indexOf("Foundation") >= 0, "References panel controller should render source groups");
assert(referencesHtml.indexOf("&lt;A&gt;") >= 0, "References panel controller should escape source text");
assert(HearthLinkDepositController.titleFromUrl("https://www.youtube.com/watch?v=abc123") === "YouTube Video abc123", "Link deposit controller should infer YouTube titles");
var linkPayload = HearthLinkDepositController.videoPayload({{
  key_name: "yt-1",
  title: "Scale Video",
  url: "https://youtube.com/watch?v=abc",
  category: "scales",
  level_num: 2,
  notes: "major scale"
}});
assert(linkPayload.youtube_url.indexOf("youtube.com") >= 0, "Link deposit controller should build video payload");
assert(HearthLinkDepositController.matchingTopicWords({{ title: "Major Scale", description: "", category: "scales" }}, "major scale practice").length >= 1, "Link deposit controller should match topic words");
var recorderButtonClass = {{ added: "", removed: "", add: function(name) {{ this.added = name; }}, remove: function(name) {{ this.removed = name; }} }};
var recorderButton = {{ classList: recorderButtonClass, textContent: "" }};
var recorderStatus = {{ textContent: "" }};
var recorderDoc = {{
  getElementById: function(id) {{
    if (id === "rec-btn") return recorderButton;
    if (id === "rs") return recorderStatus;
    return null;
  }}
}};
assert(HearthRecorderController.toggleRecording(false, recorderDoc) === true, "Recorder controller should toggle recording on");
assert(recorderButtonClass.added === "on", "Recorder controller should mark button active");
assert(recorderStatus.textContent === "Recording...", "Recorder controller should update status text");
var notebookStorage = {{
  values: {{ "hearth-foundation-progress": JSON.stringify({{ one: true }}) }},
  getItem: function(key) {{ return this.values[key] || null; }},
  setItem: function(key, value) {{ this.values[key] = String(value); }},
  removeItem: function(key) {{ delete this.values[key]; }}
}};
var notebookSummary = HearthNotebookController.progressSummary(notebookStorage, {{
  FOUNDATION: {{ topics: [{{}}, {{}}] }},
  DOING: {{ categories: [] }},
  KNOWING: {{ categories: [] }},
  PRACTICE: {{ topics: [] }},
  WORLD_MAP_REGIONS: [],
  CREATE: {{ categories: [] }}
}});
assert(notebookSummary.nodes[0].pct === 50, "Notebook controller should calculate node progress");
assert(HearthNotebookController.renderMiniProgressHtml(notebookSummary).indexOf("Fnd") >= 0, "Notebook controller should render mini progress");
var dictionaryTerms = [
  {{ ch: "Music Theory", term: "Scale <Test>", def: "A sequence" }},
  {{ ch: "Technique", term: "Strumming", def: "Sweeping" }}
];
assert(HearthDictionaryController.chapterCounts(dictionaryTerms)["Music Theory"] === 1, "Dictionary controller should count chapters");
var dictionaryChapter = HearthDictionaryController.renderChapterHtml(dictionaryTerms, "Music Theory");
assert(dictionaryChapter.html.indexOf("&lt;Test&gt;") >= 0, "Dictionary controller should escape term text");
var fakeShelfScrolled = {{ left: 0, behavior: "" }};
var fakeShelfDocument = {{
  getElementById: function(id) {{
    return id === "shelf-l1"
      ? {{ scrollBy: function(options) {{ fakeShelfScrolled.left = options.left; fakeShelfScrolled.behavior = options.behavior; }} }}
      : null;
  }}
}};
assert(HearthKnowingShelfController.scrollShelf("shelf-l1", -1, fakeShelfDocument) === true, "Knowing shelf controller should scroll known shelf");
assert(fakeShelfScrolled.left === -200, "Knowing shelf controller should scroll by fixed shelf distance");
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
