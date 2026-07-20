#!/usr/bin/env python3
"""Lightweight smoke checks for the Hearth simulator prototype."""

from __future__ import annotations

import json
import re
import sys
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]

REQUIRED_MARKERS = {
    "simulator.html": [
        '<link rel="icon" type="image/png" sizes="192x192" href="images/icon-192.png">',
        "window.HEARTH_AUTO_AMBIENCE=false;",
        "assets/js/scene-first.js",
        "adapters/create-cauldron-scene-viewer.js",
        "adapters/study-key-chamber-viewer.js",
        "adapters/play-atlas-model.js",
        "adapters/play-atlas-viewer.js",
        "adapters/play-atlas-controller.js",
        "adapters/mastery-phoenix-viewer.js",
        "core/lesson-core.js",
        "core/renderer-registry.js",
        "adapters/action-renderer-registry-bootstrap.js",
        "core/foundation-adapter.js",
        "core/foundation-progress.js",
        "adapters/foundation-route-manifest-runtime.js",
        "adapters/foundation-seed-loader.js",
        "adapters/foundation-lesson-launcher.js",
        "adapters/foundation-lesson-shell.js",
        "adapters/foundation-ui-utils.js",
        "adapters/rainbow-blocks-viewer.js",
        "adapters/foundation-map-viewer.js",
        "adapters/foundation-panel-controller.js",
        "adapters/foundation-topic-viewer.js",
        "adapters/foundation-topic-controller.js",
        "adapters/foundation-action-renderers.js",
        "adapters/foundation-audio.js",
        "core/lesson-session.js",
        "core/progress-event.js",
        "core/journey-progress.js",
        "adapters/cross-node-handoff-store.js",
        "adapters/foundation-progress-bridge.js",
        "adapters/teaching-engine-core-adapter.js",
        "assets/js/teaching-engine.js",
        "adapters/doing-ui-utils.js",
        "adapters/doing-config.js",
        "adapters/doing-drill-catalog.js",
        "adapters/doing-drill-board-model.js",
        "adapters/doing-controls-controller.js",
        "adapters/doing-drill-adjust-controller.js",
        "adapters/doing-drill-preview-controller.js",
        "adapters/doing-teaching-viewer.js",
        "adapters/doing-drill-detail-viewer.js",
        "adapters/doing-drill-board-viewer.js",
        "adapters/doing-shell-viewer.js",
        "adapters/doing-entry-viewer.js",
        "adapters/doing-explorer-viewer.js",
        "adapters/doing-explorer-controller.js",
        "adapters/doing-map-viewer.js",
        "adapters/doing-map-controller.js",
        "adapters/doing-room-viewer.js",
        "adapters/doing-panel-controller.js",
        "adapters/knowing-level-model.js",
        "adapters/knowing-shelf-viewer.js",
        "adapters/knowing-shelf-controller.js",
        "adapters/knowing-book-viewer.js",
        "adapters/knowing-topic-viewer.js",
        "adapters/knowing-progress-controller.js",
        "adapters/knowing-panel-controller.js",
        "adapters/knowing-study-model.js",
        "adapters/knowing-study-dashboard-viewer.js",
        "adapters/knowing-study-question-model.js",
        "adapters/knowing-study-session-model.js",
        "adapters/knowing-study-session-viewer.js",
        "adapters/knowing-study-quiz-controller.js",
        "adapters/practice-state.js",
        "adapters/practice-guide-model.js",
        "adapters/practice-dashboard-viewer.js",
        "adapters/practice-drill-viewer.js",
        "adapters/practice-session-model.js",
        "adapters/practice-session-viewer.js",
        "adapters/practice-ui-utils.js",
        "adapters/practice-metronome-controller.js",
        "adapters/practice-entry-model.js",
        "adapters/practice-entry-viewer.js",
        "adapters/practice-entry-controller.js",
        "adapters/practice-planned-session-store.js",
        "adapters/practice-planned-session-viewer.js",
        "adapters/practice-planned-session-controller.js",
        "adapters/play-world-viewer.js",
        "adapters/mastery-viewer.js",
        "adapters/create-cauldron-model.js",
        "adapters/create-cauldron-viewer.js",
        "adapters/create-cauldron-controller.js",
        "adapters/create-state.js",
        "adapters/create-handoff-controller.js",
        "adapters/create-entry-model.js",
        "adapters/create-entry-viewer.js",
        "adapters/create-entry-controller.js",
        "adapters/text-to-speech-controller.js",
        "adapters/header-tools-controller.js",
        "adapters/references-panel-controller.js",
        "adapters/link-deposit-controller.js",
        "adapters/recorder-controller.js",
        "adapters/notebook-controller.js",
        "adapters/dictionary-controller.js",
        "assets/js/journey-data.js",
        "assets/js/guide-character-data.js",
        "assets/js/journey.js",
        "adapters/journey-legacy-handlers.js",
        "assets/js/map-node-data.js",
        "assets/js/map-node-info.js",
        "adapters/node-legacy-handlers.js",
        "assets/js/hearth-body-data.js",
        "adapters/hearth-body-viewer.js",
        "adapters/practice-candle-viewer.js",
        "NODE LAYOUT RESCUE LAYER",
    ],
    "assets/js/map-node-data.js": [
        "var NODE_DATA",
        "window.NODE_DATA",
        "map-nodes-generated-v2-normalized",
        "title:'The Hearth'",
        "action:'practice'",
    ],
    "assets/js/map-node-info.js": [
        "showNodeInfo",
        "presentNodeInfo",
        "enterNodeAction",
        "hideNodeInfo",
        "updateCurrentNodeMarker",
        "wireMapNodeAccess",
        "aria-label",
    ],
    "assets/js/hearth-body-data.js": [
        "var HEARTH_BODY_COPY",
        "var HEARTH_BODY_ZONES",
        "window.HEARTH_BODY_COPY",
        "window.HEARTH_BODY_ZONES",
        'id: "brain"',
        'id: "hands"',
        'id: "feeling"',
        'id: "integration"',
        "development",
        "practices",
        "care",
    ],
    "assets/js/scene-first.js": [
        "initSceneFirstLegacyPlaceholder",
    ],
    "adapters/create-cauldron-scene-viewer.js": [
        "root.CreateCauldronScene",
        "root.showCreate",
        "CREATE_HEAT_LEVELS",
        "stirCauldron",
        "returnToSource",
    ],
    "adapters/create-state.js": [
        "root.HearthCreateState",
        "createStore",
        "hearth-create-v1",
    ],
    "adapters/create-handoff-controller.js": [
        "root.HearthCreateHandoff",
        "buildSeed",
        "create_handoff_opened",
    ],
    "adapters/doing-teaching-viewer.js": [
        "renderCreateHandoff",
        "When it starts to sound like music",
        "_openDoingCreate",
    ],
    "adapters/create-entry-model.js": [
        "root.HearthCreateEntryModel",
        "buildSnapshot",
        "hasMaterial",
    ],
    "adapters/create-entry-viewer.js": [
        "root.HearthCreateEntryViewer",
        "create-entry-hotspot",
        "renderContext",
    ],
    "adapters/create-entry-controller.js": [
        "root.HearthCreateEntryController",
        "root.showCreate = showCreate",
        "openCauldron",
        "receiveFirePrompt",
    ],
    "adapters/play-atlas-viewer.js": [
        "root.HearthPlayAtlasViewer",
        "renderHotspots",
        "renderDrawer",
        "Enter the tradition",
    ],
    "adapters/play-atlas-model.js": [
        "root.HearthPlayAtlasModel",
        "activeLearner",
        "buildSnapshot",
        "readRuntimeSnapshot",
    ],
    "adapters/play-atlas-controller.js": [
        "root.HearthPlayAtlasController",
        "root.showPlay = open",
        "openWithHandoff",
        "song-complete",
        "saveResult",
        "play_activity_completed",
    ],
    "adapters/study-key-chamber-viewer.js": [
        "root.StudyKeyChamber",
        "root.showStudy",
        "STUDY_DOORS",
        "renderStudyChamber",
        "openWithHandoff",
        "returnToSource",
        "Return to Journey",
    ],
    "core/knowing-progress.js": [
        "root.HearthKnowingProgress",
        "knowing_topic_opened",
        "knowing_topic_answered",
        "capability_ids",
    ],
    "core/foundation-progress.js": [
        "root.HearthFoundationProgress",
        "foundation_topic_opened",
        "foundation_orientation_completed",
        "foundation_path_completed",
        "L1-PREP-01",
    ],
    "adapters/practice-candle-viewer.js": [
        "root.PracticeCandle",
        "root.showPractice",
        "renderPracticeCandle",
        "lightPracticeCandle",
        "hearth-practice-candle-v1",
        "repeat_next",
    ],
    "adapters/practice-entry-model.js": [
        "root.HearthPracticeEntryModel",
        "buildSnapshot",
        "learnerPracticeEvents",
        "plannedSession",
        "candleMatchesLearner",
    ],
    "adapters/practice-entry-viewer.js": [
        "root.HearthPracticeEntryViewer",
        "renderContext",
        "practice-entry-hotspot",
        "data-practice-free-minutes",
        "data-practice-review-id",
    ],
    "adapters/practice-entry-controller.js": [
        "root.HearthPracticeEntryController",
        "root.showPractice = showPractice",
        "hearth:journey-state",
        "freeDraft",
        "continue-session",
        "openWithHandoff",
        "returnToSource",
    ],
    "adapters/practice-planned-session-viewer.js": [
        "root.HearthPracticePlannedSessionViewer",
        "createSession",
        "data-practice-flow-action",
        "data-practice-body-state",
        "practice-flow-art",
        "practice-flow-condition-orb",
        "practice-flow-practise-path",
    ],
    "adapters/practice-planned-session-controller.js": [
        "root.PracticePlannedSession",
        "open-candle",
        "practice_session_completed",
        "HearthPracticePlannedSessionStore",
        "songPracticeDayCount",
    ],
    "adapters/practice-planned-session-store.js": [
        "root.HearthPracticePlannedSessionStore",
        "hearth-planned-practice-v2",
        "hearth-planned-practice-v1",
        "profiles",
    ],
    "adapters/mastery-phoenix-viewer.js": [
        "root.MasteryPhoenix",
        "root.showMastery",
        "MASTERY_SEALS",
        "openSeal",
        "openWithHandoff",
        "returnToSource",
    ],
    "adapters/hearth-body-viewer.js": [
        "root.HearthBody",
        "root.showHearth",
        "renderHearthBody",
        "renderHearthChamber",
        "openWithHandoff",
        "returnToSource",
        "Return to Journey",
    ],
    "assets/js/teaching-engine.js": [
        "window.TeachingEngine",
        "function createTeachingEngine",
        "function createCoreController",
        "HearthTeachingEngineCoreAdapter",
        "HearthActionRendererRegistry",
        "renderer_key",
        "function showGradientFailsafe",
    ],
    "assets/js/journey.js": [
        "window.Journey",
        "hearth-journey-v2",
        "function buildLesson",
        "function loadState",
        "window.JOURNEY_LEVELS",
        "JOURNEY_AUTHORED_LESSONS",
        "GUIDE_CHARACTER_ASSETS",
        "openCompanionDoing",
        "HearthCrossNodeHandoffStore",
        "guided lessons recorded",
    ],
    "assets/js/guide-character-data.js": [
        "window.GUIDE_CHARACTER_ASSETS",
        "guide-variations-v2-contact-sheet.png",
        "guide-neutral-v1-ui.webp",
        "guide-encouraging-v1-ui.webp",
        "guide-thinking-v1-ui.webp",
        "guide-celebratory-v1-ui.webp",
        "guide-seated-neutral-v1-ui.webp",
        "guide-seated-teaching-v1-ui.webp",
        "guide-seated-listening-v1-ui.webp",
        "guide-head-neutral-v1-ui.webp",
        "guide-head-question-v1-ui.webp",
        "guide-head-lightbulb-v1-ui.webp",
    ],
    "GUIDE_ASSET_CATALOG.md": [
        "Guide Asset Catalog",
        "guide-variations-v2-contact-sheet.png",
        "guide-neutral-v1.png",
        "guide-encouraging-v1.png",
        "guide-thinking-v1.png",
        "guide-celebratory-v1.png",
        "guide-seated-neutral-v1.png",
        "guide-seated-teaching-v1.png",
        "guide-seated-listening-v1.png",
        "guide-head-neutral-v1.png",
        "guide-head-question-v1.png",
        "guide-head-lightbulb-v1.png",
    ],
    "assets/js/journey-data.js": [
        "var JOURNEY_LEVELS",
        "var JOURNEY_CONCEPT_BANK",
        "var JOURNEY_TASK_BANK",
        "var JOURNEY_AUTHORED_LESSONS",
        "var JOURNEY_STUDENT_COMPANIONS",
        "window.JOURNEY_LEVELS",
        "Entry Check: Find the Real Starting Point",
        "Carry It Into a Song",
        "QJam Level 1 Integration",
        "A minor pentatonic consolidation",
        "root notes as safety points",
        "doingHandoff",
    ],
    "assets/js/lesson-1-foundation.js": [
        "LESSON_1_FOUNDATION",
        "steps:",
        "window.LESSON_1_FOUNDATION",
    ],
    "adapters/foundation-audio.js": [
        "HearthFoundationAudio",
        "playTone",
        "_l1_playTone",
    ],
    "assets/js/create-obstructions.js": [
        "const CREATE_OBSTRUCTIONS",
        "window.CREATE_OBSTRUCTIONS",
    ],
    "assets/js/create-combos.js": [
        "const CREATE_COMBOS",
        "window.CREATE_COMBOS",
    ],
    "assets/js/lessons-threshold.js": ["window.LESSON_THRESHOLD", "steps:"],
    "assets/js/lessons-how-to-learn.js": ["window.LESSON_HOW_TO_LEARN", "steps:"],
    "assets/js/lessons-learning-a-language.js": ["window.LESSON_LEARNING_A_LANGUAGE", "steps:"],
    "assets/js/lessons-language-of-music.js": ["window.LESSON_LANGUAGE_OF_MUSIC", "steps:"],
    "assets/js/lessons-language-of-guitar.js": ["window.LESSON_LANGUAGE_OF_GUITAR", "steps:"],
    "assets/js/lessons-the-tool.js": ["window.LESSON_THE_TOOL", "steps:"],
    "assets/js/lessons-the-guitar.js": ["window.LESSON_THE_GUITAR", "steps:"],
    "assets/js/lessons-speaking.js": ["window.LESSON_SPEAKING", "steps:"],
    "assets/js/lessons-rhythm-pulse.js": ["window.LESSON_RHYTHM_PULSE", "steps:"],
    "assets/js/lessons-first-shapes.js": ["window.LESSON_FIRST_SHAPES", "steps:"],
    "assets/js/lessons-first-conversation.js": ["window.LESSON_FIRST_CONVERSATION", "steps:"],
    "assets/js/lessons-conversations.js": ["window.LESSON_CONVERSATIONS", "steps:"],
    "core/lesson-core.js": [
        "HearthLessonCore",
        "validateLessonSeed",
        "buildRouteSummary",
    ],
    "adapters/foundation-seed-loader.js": [
        "HearthFoundationSeedLoader",
        "normalizeSeedForTeachingEngine",
        "loadSeedForRoute",
    ],
    "adapters/foundation-lesson-launcher.js": [
        "HearthFoundationLessonLauncher",
        "resolveFoundationLesson",
        "FALLBACK_LESSON_ID_BY_TOPIC_ID",
    ],
    "adapters/foundation-lesson-shell.js": [
        "HearthFoundationLessonShell",
        "renderFoundationLessonShell",
        "teach-container",
    ],
    "adapters/foundation-ui-utils.js": [
        "HearthFoundationUiUtils",
        "escapeHtml",
        "colorForIndex",
    ],
    "adapters/rainbow-blocks-viewer.js": [
        "HearthRainbowBlocksViewer",
        "renderRainbowBlocks",
        "rainbowBlocks",
    ],
    "adapters/foundation-map-viewer.js": [
        "HearthFoundationMapViewer",
        "renderFoundationMap",
        "found-neck-wrap",
    ],
    "adapters/foundation-panel-controller.js": [
        "HearthFoundationPanelController",
        "showFoundation",
        "startLesson1",
    ],
    "adapters/foundation-topic-viewer.js": [
        "HearthFoundationTopicViewer",
        "renderFoundationTopicStep",
        "foundation-topic-page",
    ],
    "adapters/foundation-topic-controller.js": [
        "HearthFoundationTopicController",
        "showFoundationTopic",
        "completeFoundationTopic",
    ],
    "core/lesson-view-model.js": ["HearthLessonViewModel", "buildLessonViewModel"],
    "core/renderer-registry.js": ["HearthRendererRegistry", "createRegistry"],
    "core/foundation-adapter.js": ["HearthFoundationAdapter", "findRouteByTopic"],
    "adapters/foundation-route-manifest-runtime.js": [
        "HearthFoundationRouteManifest",
        "f-first-conversation",
    ],
    "adapters/foundation-action-renderers.js": [
        "HearthFoundationActionRenderers",
        "registerLegacyFoundationActionRenderers",
        "foundation.e_major_chord",
    ],
    "adapters/action-renderer-registry-bootstrap.js": [
        "HearthActionRendererRegistry",
        "createRegistry",
    ],
    "core/lesson-session.js": ["HearthLessonSession", "evaluateChoice"],
    "core/learner-progress.js": ["HearthLearnerProgress", "recordLessonAnswer"],
    "core/progress-event.js": [
        "HearthProgressEventContract",
        "validateAndNormalize",
        "normalizeForRead",
        "sameNormalizedPayload",
    ],
    "core/journey-progress.js": [
        "HearthJourneyProgress",
        "normalizeLevelId",
        "summarize",
        "capabilityEvidence",
    ],
    "adapters/progress-event-store.js": [
        "HearthProgressEvents",
        "appendCanonical",
        "appendLegacy",
        "listNormalized",
        "duplicate_id_conflict",
    ],
    "adapters/cross-node-handoff-store.js": [
        "HearthCrossNodeHandoffStore",
        "hearth-active-handoff-v1",
        "destinationNodeId",
        "learnerId",
    ],
    "adapters/foundation-progress-bridge.js": [
        "HearthFoundationProgressBridge",
        "markFoundationLessonCompleted",
        "markFoundationTopicCompleted",
        "recordTopicOpened",
        "readProgress",
        "hearth-foundation-progress",
    ],
    "adapters/browser-progress-store.js": [
        "HearthBrowserProgressStore",
        "createBrowserProgressStore",
    ],
    "adapters/doing-progress-bridge.js": [
        "HearthDoingProgressBridge",
        "progressForLearner",
        "evidenceForDrill",
        "masteredDistinctDays",
        "destination_node_id",
        "attempt_id",
        "occurred_at",
        "return_route",
        "handoff_id",
        "migrateLegacyProgress",
        "drill_opened",
        "hearth-doing-progress-migration-v1",
    ],
    "adapters/doing-config.js": [
        "HearthDoingConfig",
        "levelForDrill",
        "coachForCategory",
        "guitarZones",
    ],
    "adapters/doing-drill-catalog.js": [
        "HearthDoingDrillCatalog",
        "approvedCount",
        "capabilityIds",
        "reviewStatus",
    ],
    "adapters/doing-ui-utils.js": [
        "HearthDoingUiUtils",
        "escapeHtml",
        "drillShort",
    ],
    "adapters/doing-drill-board-model.js": [
        "HearthDoingDrillBoardModel",
        "countForGenre",
        "findNextDrill",
    ],
    "adapters/doing-controls-controller.js": [
        "HearthDoingControlsController",
        "bindDoingControls",
        "stateForQuickLink",
    ],
    "adapters/doing-drill-adjust-controller.js": [
        "HearthDoingDrillAdjustController",
        "bindDrillAdjustButtons",
        "messageForAdjustment",
    ],
    "adapters/doing-drill-preview-controller.js": [
        "HearthDoingDrillPreviewController",
        "bindDrillPreviews",
        "renderPreviewHtml",
    ],
    "adapters/doing-teaching-viewer.js": [
        "HearthDoingTeachingViewer",
        "renderScene",
        "renderEvidence",
        "doing-teaching-scene",
    ],
    "adapters/doing-drill-detail-viewer.js": [
        "HearthDoingDrillDetailViewer",
        "renderDoingDrillDetail",
        "HearthDoingTeachingViewer",
        "pageMode: true",
    ],
    "adapters/doing-drill-board-viewer.js": [
        "HearthDoingDrillBoardViewer",
        "renderDoingDrillBoard",
        "doing-library-neck",
    ],
    "adapters/doing-shell-viewer.js": [
        "HearthDoingShellViewer",
        "renderDoingShell",
        "doing-shell",
    ],
    "adapters/doing-entry-viewer.js": [
        "HearthDoingEntryViewer",
        "renderDoingEntry",
        "doing-calm",
    ],
    "adapters/doing-explorer-viewer.js": [
        "HearthDoingExplorerViewer",
        "renderDoingExplorer",
        "doing-explore",
    ],
    "adapters/doing-explorer-controller.js": [
        "HearthDoingExplorerController",
        "bindExplorerNoteLocator",
        "renderFretboardSvg",
    ],
    "adapters/doing-map-viewer.js": [
        "HearthDoingMapViewer",
        "renderDoingMap",
        "showDoingBubble",
        "doing-map-wrap",
    ],
    "adapters/doing-map-controller.js": [
        "HearthDoingMapController",
        "bindDoingMapGlobals",
        "stateForZone",
    ],
    "adapters/doing-room-viewer.js": [
        "HearthDoingRoomViewer",
        "renderRoomConcept",
        "doing-room-preview",
    ],
    "adapters/doing-panel-controller.js": [
        "HearthDoingPanelController",
        "showDoing",
        "applyState",
        "progressForLearner",
        "recordDrillOpen",
        "doing-practice-return",
        "PracticePlannedSession.resume",
        "Return to Journey",
        "_returnFromDoingHandoff",
        "activeTaskContext",
    ],
    "adapters/knowing-level-model.js": [
        "HearthKnowingLevelModel",
        "buildLevels",
        "recommendedLevel",
    ],
    "adapters/knowing-shelf-viewer.js": [
        "HearthKnowingShelfViewer",
        "renderKnowingShelf",
        "knowing-shelf-scene",
    ],
    "adapters/knowing-shelf-controller.js": [
        "HearthKnowingShelfController",
        "bindShelfGlobals",
        "scrollShelf",
    ],
    "adapters/knowing-book-viewer.js": [
        "HearthKnowingBookViewer",
        "renderKnowingBook",
        "renderTopicRow",
    ],
    "adapters/knowing-topic-viewer.js": [
        "HearthKnowingTopicViewer",
        "renderKnowingTopic",
        "nextTopicFor",
    ],
    "adapters/knowing-progress-controller.js": [
        "HearthKnowingProgressController",
        "bindProgressGlobals",
        "recordStage",
        "readLegacyProgress",
        "topicProjection",
        "sendToStudy",
        "appendCanonical",
    ],
    "adapters/knowing-panel-controller.js": [
        "HearthKnowingPanelController",
        "bindKnowingGlobals",
        "showKnowing",
    ],
    "adapters/knowing-study-model.js": [
        "HearthKnowingStudyModel",
        "dashboardState",
        "summarizeProgress",
    ],
    "adapters/knowing-study-dashboard-viewer.js": [
        "HearthKnowingStudyDashboardViewer",
        "renderStudyDashboard",
        "renderDisciplineList",
    ],
    "adapters/knowing-study-question-model.js": [
        "HearthKnowingStudyQuestionModel",
        "generateQuestions",
        "extractTerms",
    ],
    "adapters/knowing-study-session-model.js": [
        "HearthKnowingStudySessionModel",
        "topicContext",
        "assessmentOutcome",
        "difficultyLabel",
    ],
    "adapters/knowing-study-session-viewer.js": [
        "HearthKnowingStudySessionViewer",
        "renderStudySession",
        "renderAssessmentResult",
        "renderQuiz",
    ],
    "adapters/knowing-study-quiz-controller.js": [
        "HearthKnowingStudyQuizController",
        "answerQuiz",
        "scoreResult",
    ],
    "adapters/practice-state.js": [
        "HearthPracticeState",
        "readState",
        "nextDrill",
    ],
    "adapters/practice-guide-model.js": [
        "HearthPracticeGuideModel",
        "guideText",
        "drillGuideText",
    ],
    "adapters/practice-dashboard-viewer.js": [
        "HearthPracticeDashboardViewer",
        "renderPracticeDashboard",
        "escapeHtml",
    ],
    "adapters/practice-drill-viewer.js": [
        "HearthPracticeDrillViewer",
        "renderPracticeDrill",
        "renderAttemptHistory",
    ],
    "adapters/practice-session-viewer.js": [
        "HearthPracticeSessionViewer",
        "renderFinishResult",
        "renderPracticeSession",
        "renderMetronome",
    ],
    "adapters/practice-session-model.js": [
        "HearthPracticeSessionModel",
        "finishOutcome",
    ],
    "adapters/practice-ui-utils.js": [
        "HearthPracticeUiUtils",
        "calcStreak",
        "timeAgo",
    ],
    "adapters/practice-metronome-controller.js": [
        "HearthPracticeMetronomeController",
        "createState",
        "timerState",
    ],
    "adapters/play-world-viewer.js": [
        "HearthPlayWorldViewer",
        "renderPlayWorld",
        "renderRegionDetail",
        "renderHotspot",
    ],
    "adapters/mastery-viewer.js": [
        "HearthMasteryViewer",
        "renderMastery",
        "renderMastersLibrary",
    ],
    "adapters/create-cauldron-viewer.js": [
        "HearthCreateCauldronViewer",
        "renderCauldron",
        "renderIngredient",
        "renderMixResult",
    ],
    "adapters/create-cauldron-model.js": [
        "HearthCreateCauldronModel",
        "mixResult",
        "matchingCombo",
    ],
    "adapters/create-cauldron-controller.js": [
        "HearthCreateCauldronController",
        "syncSelectionUi",
        "resetCauldronUi",
    ],
    "adapters/text-to-speech-controller.js": [
        "HearthTextToSpeechController",
        "readableText",
        "preferredVoice",
    ],
    "adapters/header-tools-controller.js": [
        "HearthHeaderToolsController",
        "collectSearchResults",
        "renderProgressHtml",
    ],
    "adapters/references-panel-controller.js": [
        "HearthReferencesPanelController",
        "renderReferencesHtml",
        "sourceGroups",
    ],
    "adapters/link-deposit-controller.js": [
        "HearthLinkDepositController",
        "videoPayload",
        "matchingTopicWords",
    ],
    "adapters/recorder-controller.js": [
        "HearthRecorderController",
        "toggleRecording",
        "applyRecordingState",
    ],
    "adapters/notebook-controller.js": [
        "HearthNotebookController",
        "progressSummary",
        "renderMiniProgressHtml",
    ],
    "adapters/dictionary-controller.js": [
        "HearthDictionaryController",
        "renderChapterHtml",
        "filterGlossary",
    ],
    "adapters/teaching-engine-core-adapter.js": [
        "HearthTeachingEngineCoreAdapter",
        "createTeachingLessonController",
    ],
    "core/foundation-route-manifest.json": [
        '"node_id": "foundation"',
        '"route_status": "active"',
        '"route_status": "loaded_but_not_currently_mapped"',
    ],
}

CONTENT_BANKS = {
    "assets/js/create-obstructions.js": {
        "array_name": "CREATE_OBSTRUCTIONS",
        "min_items": 45,
        "fields": ["level", "category", "constraint", "prompt", "payoff"],
    },
    "assets/js/create-combos.js": {
        "array_name": "CREATE_COMBOS",
        "min_items": 25,
        "fields": ["ingredients", "level", "constraint", "prompt", "payoff"],
    },
}

SEED_FILES = {
    "database-blueprint/seeds/create_obstructions_v2.json": {
        "count": 50,
        "fields": ["level", "category", "constraint", "prompt", "payoff"],
    },
    "database-blueprint/seeds/create_combos_v2.json": {
        "count": 32,
        "fields": ["ingredients", "level", "constraint", "prompt", "payoff"],
    },
    "database-blueprint/seeds/create_cauldron_ingredients_v2.json": {
        "count": 8,
        "fields": ["id", "name", "symbol", "color", "prompts"],
    },
    "database-blueprint/seeds/hearth_body_zones_v2.json": {
        "count": 6,
        "fields": [
            "id",
            "label",
            "seal",
            "x",
            "y",
            "r",
            "guide",
            "notice",
            "tryThis",
            "apply",
            "sourceNote",
        ],
    },
    "database-blueprint/seeds/study_key_doors_v2.json": {
        "count": 6,
        "fields": ["id", "label", "symbol", "state", "color", "guide", "action", "mode"],
    },
    "database-blueprint/seeds/mastery_phoenix_seals_v2.json": {
        "count": 4,
        "fields": ["id", "name", "artist", "color", "why", "practice"],
    },
}

HANDOFF_DOCS = [
    "database-blueprint/docs/core-rebuild-start-2026-07-04.md",
    "database-blueprint/docs/prototype-cleanup-handoff-2026-07-05.md",
]

TAXONOMY_DOCS = [
    "database-blueprint/docs/ui-navigation-taxonomy-2026-07-05.md",
]

MAP_NODE_IMAGES = [
    "images/map-nodes-generated-v2-normalized/hearth.png",
    "images/map-nodes-generated-v2-normalized/foundation.png",
    "images/map-nodes-generated-v2-normalized/mastery.png",
    "images/map-nodes-generated-v2-normalized/doing.png",
    "images/map-nodes-generated-v2-normalized/practise.png",
    "images/map-nodes-generated-v2-normalized/play.png",
    "images/map-nodes-generated-v2-normalized/knowing.png",
    "images/map-nodes-generated-v2-normalized/study.png",
    "images/map-nodes-generated-v2-normalized/create.png",
]

ENTRY_SCENE_ASSETS = [
    "images/create/create-cauldron-tableau-v2.png",
]

LESSON_SEEDS = {
    "database-blueprint/seeds/foundation_threshold_lesson_v2.json": {
        "lesson_id": "f-threshold",
        "step_count": 7,
        "allowed_types": ["speak", "ask", "cards", "video", "action", "end"],
    },
    "database-blueprint/seeds/foundation_language_of_music_lesson_v2.json": {
        "lesson_id": "f-language-of-music",
        "step_count": 10,
        "allowed_types": ["speak", "ask", "cards", "video", "action", "end"],
    },
    "database-blueprint/seeds/foundation_learning_a_language_lesson_v2.json": {
        "lesson_id": "f-learning-a-language",
        "step_count": 10,
        "allowed_types": ["speak", "ask", "cards", "video", "action", "end"],
    },
    "database-blueprint/seeds/foundation_language_of_guitar_lesson_v2.json": {
        "lesson_id": "f-language-of-guitar",
        "step_count": 10,
        "allowed_types": ["speak", "ask", "cards", "video", "action", "end"],
    },
    "database-blueprint/seeds/foundation_the_guitar_lesson_v2.json": {
        "lesson_id": "f-the-guitar",
        "step_count": 8,
        "allowed_types": ["speak", "ask", "cards", "video", "action", "end"],
    },
    "database-blueprint/seeds/foundation_speaking_lesson_v2.json": {
        "lesson_id": "f-speaking",
        "step_count": 10,
        "allowed_types": ["speak", "ask", "cards", "video", "action", "end"],
    },
    "database-blueprint/seeds/foundation_conversations_lesson_v2.json": {
        "lesson_id": "f-conversations",
        "step_count": 10,
        "allowed_types": ["speak", "ask", "cards", "video", "action", "end"],
    },
    "database-blueprint/seeds/foundation_how_to_learn_lesson_v2.json": {
        "lesson_id": "f-how-to-learn",
        "step_count": 16,
        "allowed_types": ["speak", "ask", "cards", "video", "action", "end"],
    },
    "database-blueprint/seeds/foundation_rhythm_pulse_lesson_v2.json": {
        "lesson_id": "f-rhythm-pulse",
        "step_count": 15,
        "allowed_types": ["speak", "ask", "cards", "video", "action", "end"],
    },
    "database-blueprint/seeds/foundation_first_shapes_lesson_v2.json": {
        "lesson_id": "f-first-shapes",
        "step_count": 9,
        "allowed_types": ["speak", "ask", "cards", "video", "action", "end"],
    },
    "database-blueprint/seeds/foundation_the_tool_lesson_v2.json": {
        "lesson_id": "f-the-tool",
        "step_count": 10,
        "allowed_types": ["speak", "ask", "cards", "video", "action", "end"],
    },
    "database-blueprint/seeds/foundation_first_conversation_lesson_v2.json": {
        "lesson_id": "f-first-conversation",
        "step_count": 9,
        "allowed_types": ["speak", "ask", "cards", "video", "action", "end"],
    },
}

CLEAN_FOUNDATION_ROUTE_IDS = {
    "f-threshold": "f-threshold",
    "f-how-to-learn": "f-how-to-learn",
    "f-music-language": "f-learning-a-language",
    "f-musical-alphabet": "f-language-of-music",
    "f-rhythm-pulse": "f-rhythm-pulse",
    "f-guitar-map": "f-language-of-guitar",
    "f-instrument-body": "f-the-guitar",
    "f-hands-sound": "f-speaking",
    "f-first-shapes": "f-first-shapes",
    "f-first-conversation": "f-conversations",
}

LOADED_UNMAPPED_LESSONS = {
    "LESSON_THE_TOOL": "assets/js/lessons-the-tool.js",
    "LESSON_FIRST_CONVERSATION": "assets/js/lessons-first-conversation.js",
}

HEADER_TOOL_ACTIONS = {
    "Search": 'onclick="toggleSearch()"',
    "Tools": 'onclick="toggleToolkit()"',
    "Progress": 'onclick="toggleProgress()"',
    "Settings": 'onclick="toggleSettings()"',
}

TOOLKIT_ENTRIES = {
    "Fretboard": "openFretboard();closeUtilityPanels()",
    "Dictionary": "sw('theory');closeUtilityPanels()",
    "Notes": "toggleNotebook();closeUtilityPanels()",
    "Insights": "toggleInsightPanel()",
    "Groove": "toggleBeatBot()",
}

REMOVED_FLOATING_TOOL_MARKERS = [
    'id="toolkitBtn"',
    'class="toolkit-btn"',
    'id="insightStar"',
    'class="insight-star"',
    'class="star-count"',
]


def read_text(relative_path: str) -> str:
    return (ROOT / relative_path).read_text(encoding="utf-8")


def extract_array(text: str, array_name: str) -> str | None:
    match = re.search(rf"const\s+{re.escape(array_name)}\s*=\s*\[", text)
    if not match:
        return None

    start = match.end() - 1
    depth = 0
    in_string = False
    escape = False

    for index in range(start, len(text)):
        char = text[index]

        if in_string:
            if escape:
                escape = False
            elif char == "\\":
                escape = True
            elif char == '"':
                in_string = False
            continue

        if char == '"':
            in_string = True
        elif char == "[":
            depth += 1
        elif char == "]":
            depth -= 1
            if depth == 0:
                return text[start : index + 1]

    return None


def count_top_level_objects(source: str) -> int:
    count = 0
    depth = 0
    in_string = False
    escape = False

    for char in source:
        if in_string:
            if escape:
                escape = False
            elif char == "\\":
                escape = True
            elif char == '"':
                in_string = False
            continue

        if char == '"':
            in_string = True
        elif char == "{":
            if depth == 0:
                count += 1
            depth += 1
        elif char == "}":
            depth = max(0, depth - 1)

    return count


def extract_object_entry_source(text: str, entry_key: str) -> str | None:
    match = re.search(rf"['\"]{re.escape(entry_key)}['\"]\s*:\s*\{{", text)
    if not match:
        return None

    start = match.start()
    brace_start = text.find("{", match.start(), match.end())
    depth = 0
    in_string = False
    escape = False
    quote = ""

    for index in range(brace_start, len(text)):
        char = text[index]

        if in_string:
            if escape:
                escape = False
            elif char == "\\":
                escape = True
            elif char == quote:
                in_string = False
            continue

        if char in ("'", '"'):
            in_string = True
            quote = char
        elif char == "{":
            depth += 1
        elif char == "}":
            depth -= 1
            if depth == 0:
                return text[start : index + 1]

    return None


def main() -> int:
    failures = []

    for relative_path, markers in REQUIRED_MARKERS.items():
        path = ROOT / relative_path
        if not path.exists():
            failures.append(f"Missing required file: {relative_path}")
            continue

        text = read_text(relative_path)
        for marker in markers:
            if marker not in text:
                failures.append(f"{relative_path} is missing marker: {marker}")

    for relative_path, spec in CONTENT_BANKS.items():
        text = read_text(relative_path)
        array_source = extract_array(text, spec["array_name"])
        if array_source is None:
            failures.append(f"{relative_path} is missing array: {spec['array_name']}")
            continue

        item_count = count_top_level_objects(array_source)
        if item_count < spec["min_items"]:
            failures.append(
                f"{relative_path} has {item_count} items; expected at least {spec['min_items']}"
            )

        for field in spec["fields"]:
            if not re.search(rf"\b{re.escape(field)}\s*:", array_source):
                failures.append(f"{relative_path} is missing content field: {field}")

    for relative_path, spec in SEED_FILES.items():
        path = ROOT / relative_path
        if not path.exists():
            failures.append(f"Missing seed file: {relative_path}")
            continue

        try:
            seed = json.loads(path.read_text(encoding="utf-8"))
        except json.JSONDecodeError as error:
            failures.append(f"{relative_path} is not valid JSON: {error}")
            continue

        records = seed.get("records")
        if not isinstance(records, list):
            failures.append(f"{relative_path} must contain a records list")
            continue

        if len(records) != spec["count"]:
            failures.append(
                f"{relative_path} has {len(records)} records; expected {spec['count']}"
            )

        for index, record in enumerate(records):
            if not isinstance(record, dict):
                failures.append(f"{relative_path} record {index} is not an object")
                continue
            for field in spec["fields"]:
                if field not in record:
                    failures.append(f"{relative_path} record {index} is missing field: {field}")
                    break

    for relative_path in HANDOFF_DOCS:
        path = ROOT / relative_path
        if not path.exists():
            failures.append(f"Missing handoff doc: {relative_path}")
            continue
        doc_text = path.read_text(encoding="utf-8")
        if "core/" not in doc_text or "adapters/" not in doc_text:
            failures.append(f"{relative_path} should explain both core/ and adapters/")

    for relative_path in TAXONOMY_DOCS:
        path = ROOT / relative_path
        if not path.exists():
            failures.append(f"Missing UI taxonomy doc: {relative_path}")
            continue
        doc_text = path.read_text(encoding="utf-8")
        for marker in ("Places", "Tools", "Utilities", "Capture"):
            if marker not in doc_text:
                failures.append(f"{relative_path} is missing taxonomy marker: {marker}")

    for relative_path in MAP_NODE_IMAGES:
        path = ROOT / relative_path
        if not path.exists():
            failures.append(f"Missing map node image: {relative_path}")
        elif path.stat().st_size == 0:
            failures.append(f"Map node image is empty: {relative_path}")

    for relative_path in ENTRY_SCENE_ASSETS:
        path = ROOT / relative_path
        if not path.exists():
            failures.append(f"Missing entry scene image: {relative_path}")
        elif path.stat().st_size == 0:
            failures.append(f"Entry scene image is empty: {relative_path}")

    for relative_path, spec in LESSON_SEEDS.items():
        path = ROOT / relative_path
        if not path.exists():
            failures.append(f"Missing lesson seed file: {relative_path}")
            continue

        try:
            seed = json.loads(path.read_text(encoding="utf-8"))
        except json.JSONDecodeError as error:
            failures.append(f"{relative_path} is not valid JSON: {error}")
            continue

        lesson = seed.get("lesson")
        if not isinstance(lesson, dict):
            failures.append(f"{relative_path} must contain a lesson object")
            continue

        if lesson.get("id") != spec["lesson_id"]:
            failures.append(
                f"{relative_path} lesson id is {lesson.get('id')!r}; "
                f"expected {spec['lesson_id']!r}"
            )

        steps = lesson.get("steps")
        if not isinstance(steps, list):
            failures.append(f"{relative_path} lesson must contain a steps list")
            continue

        if len(steps) != spec["step_count"]:
            failures.append(
                f"{relative_path} has {len(steps)} steps; expected {spec['step_count']}"
            )

        for index, step in enumerate(steps):
            if not isinstance(step, dict):
                failures.append(f"{relative_path} step {index} is not an object")
                continue
            if step.get("type") not in spec["allowed_types"]:
                failures.append(
                    f"{relative_path} step {index} has invalid type: {step.get('type')!r}"
                )
            if "order" not in step:
                failures.append(f"{relative_path} step {index} is missing order")
            if "text" not in step:
                failures.append(f"{relative_path} step {index} is missing text")

    simulator = read_text("simulator.html")

    shared_layout_boundary = re.search(
        r"@media\(max-width:700px\)\{[\s\S]*?\.node-info p\{[^}]*\}\s*\}\s*"
        r"/\*\s*═══ SCENESTART SHARED LAYOUT",
        simulator,
    )
    if not shared_layout_boundary:
        failures.append(
            "Shared node layout CSS must sit outside the max-width:700px mobile media query"
        )

    for label, onclick in HEADER_TOOL_ACTIONS.items():
        if f'aria-label="{label}"' not in simulator:
            failures.append(f"Header is missing top action: {label}")
        if onclick not in simulator:
            failures.append(f"Header action {label} is missing handler: {onclick}")

    for label, onclick in TOOLKIT_ENTRIES.items():
        if f"<strong>{label}</strong>" not in simulator:
            failures.append(f"Tools panel is missing entry: {label}")
        if onclick not in simulator:
            failures.append(f"Tools panel entry {label} is missing handler: {onclick}")

    for marker in REMOVED_FLOATING_TOOL_MARKERS:
        if marker in simulator:
            failures.append(f"Removed floating utility marker came back: {marker}")

    for handler in (
        "function toggleToolkit()",
        "function toggleInsightPanel()",
        "function closeUtilityPanels()",
        "window.toggleBeatBot = function()",
        "window.openFretboard = function()",
        "window.toggleNotebook = function()",
    ):
        source = simulator
        if handler.startswith("window.toggleBeatBot"):
            source = read_text("assets/js/beatbot.js")
        elif handler.startswith("window.openFretboard"):
            source = read_text("assets/js/fretboard.js")
        if handler not in source:
            failures.append(f"Tools panel handler is missing: {handler}")

    expected_script_order = [
        "assets/js/foundation.js",
        "core/lesson-core.js",
        "core/renderer-registry.js",
        "adapters/action-renderer-registry-bootstrap.js",
        "core/foundation-adapter.js",
        "adapters/foundation-route-manifest-runtime.js",
        "adapters/foundation-seed-loader.js",
        "adapters/foundation-lesson-launcher.js",
        "adapters/foundation-lesson-shell.js",
        "adapters/foundation-ui-utils.js",
        "adapters/rainbow-blocks-viewer.js",
        "adapters/foundation-map-viewer.js",
        "adapters/foundation-panel-controller.js",
        "adapters/foundation-topic-viewer.js",
        "adapters/foundation-topic-controller.js",
        "core/lesson-view-model.js",
        "core/lesson-session.js",
        "core/learner-progress.js",
        "core/progress-event.js",
        "core/foundation-progress.js",
        "core/journey-progress.js",
        "core/level-one-song-thread.js",
        "adapters/browser-progress-store.js",
        "adapters/progress-event-store.js",
        "adapters/cross-node-handoff-store.js",
        "adapters/foundation-progress-bridge.js",
        "adapters/teaching-engine-core-adapter.js",
        "assets/js/teaching-engine.js",
        "adapters/doing-ui-utils.js",
        "adapters/doing-config.js",
        "adapters/doing-drill-catalog.js",
        "adapters/doing-drill-board-model.js",
        "adapters/doing-controls-controller.js",
        "adapters/doing-drill-adjust-controller.js",
        "adapters/doing-drill-preview-controller.js",
        "adapters/doing-teaching-viewer.js",
        "adapters/doing-drill-detail-viewer.js",
        "adapters/doing-drill-board-viewer.js",
        "adapters/doing-shell-viewer.js",
        "adapters/doing-entry-viewer.js",
        "adapters/doing-explorer-viewer.js",
        "adapters/doing-explorer-controller.js",
        "adapters/doing-map-viewer.js",
        "adapters/doing-map-controller.js",
        "adapters/doing-room-viewer.js",
        "adapters/doing-panel-controller.js",
        "adapters/knowing-level-model.js",
        "adapters/knowing-shelf-viewer.js",
        "adapters/knowing-shelf-controller.js",
        "adapters/knowing-book-viewer.js",
        "adapters/knowing-topic-viewer.js",
        "adapters/knowing-progress-controller.js",
        "adapters/knowing-panel-controller.js",
        "adapters/knowing-study-model.js",
        "adapters/knowing-study-dashboard-viewer.js",
        "adapters/knowing-study-question-model.js",
        "adapters/knowing-study-session-model.js",
        "adapters/knowing-study-session-viewer.js",
        "adapters/knowing-study-quiz-controller.js",
        "adapters/practice-state.js",
        "adapters/practice-guide-model.js",
        "adapters/practice-dashboard-viewer.js",
        "adapters/practice-drill-viewer.js",
        "adapters/practice-session-model.js",
        "adapters/practice-session-viewer.js",
        "adapters/practice-ui-utils.js",
        "adapters/practice-metronome-controller.js",
        "adapters/play-world-viewer.js",
        "adapters/mastery-viewer.js",
        "adapters/create-cauldron-model.js",
        "adapters/create-cauldron-viewer.js",
        "adapters/create-cauldron-controller.js",
        "adapters/text-to-speech-controller.js",
        "adapters/header-tools-controller.js",
        "adapters/references-panel-controller.js",
        "adapters/link-deposit-controller.js",
        "adapters/recorder-controller.js",
        "adapters/notebook-controller.js",
        "adapters/dictionary-controller.js",
    ]
    previous_index = -1
    for script_path in expected_script_order:
        script_tag = re.search(
            rf'<script\s+src="{re.escape(script_path)}(?:\?[^\"]*)?"\s*></script>',
            simulator,
        )
        if script_tag is None:
            failures.append(f"simulator.html is missing script tag: {script_path}")
            continue
        current_index = script_tag.start()
        if current_index < previous_index:
            failures.append(f"simulator.html loads {script_path} out of clean-core bridge order")
        previous_index = current_index

    lesson_1_script_index = simulator.find('<script src="assets/js/lesson-1-foundation.js"></script>')
    foundation_audio_script_index = simulator.find('<script src="adapters/foundation-audio.js"></script>')
    foundation_renderer_script_index = simulator.find(
        '<script src="adapters/foundation-action-renderers.js"></script>'
    )
    if (
        lesson_1_script_index == -1
        or foundation_audio_script_index == -1
        or foundation_renderer_script_index == -1
    ):
        failures.append(
            "simulator.html must load foundation-audio.js, lesson-1-foundation.js, "
            "and foundation-action-renderers.js"
        )
    elif lesson_1_script_index < foundation_audio_script_index:
        failures.append("foundation-audio.js must load before lesson-1-foundation.js")
    elif foundation_renderer_script_index < lesson_1_script_index:
        failures.append("foundation-action-renderers.js must load after lesson-1-foundation.js")

    lesson_1_source = read_text("assets/js/lesson-1-foundation.js")
    if "function _l1_playTone" in lesson_1_source:
        failures.append("_l1_playTone should live in adapters/foundation-audio.js")

    runtime_manifest = read_text("adapters/foundation-route-manifest-runtime.js")
    launcher_source = read_text("adapters/foundation-lesson-launcher.js")
    for topic_id, lesson_id in CLEAN_FOUNDATION_ROUTE_IDS.items():
        clean_route_pattern = (
            rf'topic_id:\s*"{re.escape(topic_id)}"[\s\S]*?'
            rf'lesson_id:\s*"{re.escape(lesson_id)}"'
        )
        fallback_route_pattern = (
            rf"['\"]{re.escape(topic_id)}['\"]\s*:\s*"
            rf"['\"]{re.escape(lesson_id)}['\"]"
        )
        if not re.search(clean_route_pattern, runtime_manifest):
            failures.append(f"runtime Foundation manifest is missing route: {topic_id} -> {lesson_id}")
        if not re.search(fallback_route_pattern, launcher_source):
            failures.append(
                f"Foundation launcher fallback route {topic_id} no longer points to {lesson_id}"
            )

    for lesson_global, source_file in LOADED_UNMAPPED_LESSONS.items():
        if f'<script src="{source_file}"></script>' not in simulator:
            failures.append(f"simulator.html no longer loads unmapped lesson file: {source_file}")
        route_pattern = rf"['\"]f-[^'\"]+['\"]\s*:\s*\{{[^}}]*{re.escape(lesson_global)}"
        if re.search(route_pattern, simulator):
            failures.append(
                f"{lesson_global} is now mapped in showFoundationTopic; "
                "update Foundation migration docs and route expectations"
            )

    if failures:
        print("Prototype smoke check failed:")
        for failure in failures:
            print(f"- {failure}")
        return 1

    print("Prototype smoke check passed.")
    print(
        f"Checked {len(REQUIRED_MARKERS)} key files, "
        f"{len(CONTENT_BANKS)} content banks, "
        f"{len(SEED_FILES)} seed files, {len(LESSON_SEEDS)} lesson seeds, "
        f"and {len(CLEAN_FOUNDATION_ROUTE_IDS)} Foundation routes."
    )
    return 0


if __name__ == "__main__":
    sys.exit(main())
