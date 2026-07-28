/*
 * Practice session model adapter v0.
 *
 * Decides what happens after a timed Practice drill session finishes.
 */
(function initPracticeSessionModel(root, factory) {
  if (typeof module !== "undefined" && module.exports) {
    module.exports = factory(root);
  } else {
    root.HearthPracticeSessionModel = factory(root);
  }
})(typeof globalThis !== "undefined" ? globalThis : this, function createPracticeSessionModel() {
  "use strict";

  function finishOutcome(practice, drill, feeling) {
    var drills = (practice && practice.drills) || [];
    var drillId = drill && drill.id;
    var drillIndex = drills.findIndex(function isDrill(item) {
      return item.id === drillId;
    });
    var nextDrill = null;
    var nextAction = "";

    if (feeling === "nailed") {
      nextDrill = drills[drillIndex + 1];
      nextAction = nextDrill ?
        "Next up: <strong>" + nextDrill.title + "</strong> - ready?" :
        "You've worked through all the drills! Loop back and reinforce.";
      return {
        emoji: "\uD83D\uDD25",
        markComplete: true,
        message: "Nailed it!",
        nextAction: nextAction,
        nextDrill: nextDrill
      };
    }

    if (feeling === "getting") {
      return {
        emoji: "\uD83D\uDCAA",
        markComplete: false,
        message: "Getting there - keep going",
        nextAction: "Good - keep practising <strong>" + drill.title + "</strong>. Repetition is the teacher.",
        nextDrill: drill
      };
    }

    if (feeling === "stuck") {
      var prevDrill = drillIndex > 0 ? drills[drillIndex - 1] : null;
      if (prevDrill) {
        return {
          emoji: "\uD83E\uDD14",
          markComplete: false,
          message: "Skipped gradient detected - stepping back",
          nextAction: "Gradient too steep? Totally fine. Drop back to <strong>" + prevDrill.title + "</strong> and strengthen the foundation.",
          nextDrill: prevDrill
        };
      }
    }

    return {
      emoji: "\uD83E\uDD14",
      markComplete: false,
      message: "Skipped gradient detected - stepping back",
      nextAction: "Take it slow - there's no rush. Try <strong>" + drill.title + "</strong> again at a lower tempo.",
      nextDrill: drill
    };
  }

  return {
    version: "0.1.0",
    finishOutcome: finishOutcome
  };
});
