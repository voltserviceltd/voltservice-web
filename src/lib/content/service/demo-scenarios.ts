import type { DemoScenario } from "@/lib/content/domain/demo-scenario";

// Ported from the Flutter site's marketing_content.dart (demoScenarios).
// Shared by Solutions (first 3) and Technology (last one) pages.
export const demoScenarios: DemoScenario[] = [
  {
    eyebrow: "Product preview",
    title: "PaySmart demo preview",
    description:
      "Show merchants a clean rollout from initial interest to live dashboard visibility without changing tone or product language.",
    steps: [
      {
        label: "Acquire",
        title: "Capture intent with a narrow decision path",
        description:
          "The first screen keeps the value proposition clear and routes the highest-intent visitor into onboarding.",
        metrics: [
          { label: "Qualified leads", value: "+28%" },
          { label: "Bounce risk", value: "-18%" },
          { label: "Activation path", value: "2 steps" },
        ],
        codeLines: ["POST /merchant/leads", "status: qualified", "next: onboarding"],
      },
      {
        label: "Onboard",
        title: "Verify merchant setup without losing momentum",
        description:
          "Requirements, state messaging, and support touchpoints are visible before the merchant commits time.",
        metrics: [
          { label: "Completion rate", value: "91%" },
          { label: "Manual review", value: "12%" },
          { label: "Median setup", value: "7 min" },
        ],
        codeLines: ["PATCH /merchant/onboarding", "verification: pending_review", "sla: 24h"],
      },
      {
        label: "Operate",
        title: "Expose payment status and merchant health in one view",
        description:
          "Once live, the product shifts to dashboards, settlement states, and action-ready operational visibility.",
        metrics: [
          { label: "Settlement visibility", value: "Realtime" },
          { label: "Support load", value: "-22%" },
          { label: "Risk flags", value: "3 active" },
        ],
        codeLines: ["GET /merchant/dashboard", "payout_status: healthy", "alerts: low"],
      },
    ],
  },
  {
    eyebrow: "Flow simulation",
    title: "Payment flow orchestration",
    description:
      "A clear transaction sequence helps merchants and operators understand what happens before, during, and after a payment event.",
    steps: [
      {
        label: "Request",
        title: "Create intent and assign routing logic",
        description:
          "The system records transaction intent, required checks, and the preferred processing path.",
        metrics: [
          { label: "Route match", value: "98.4%" },
          { label: "Latency", value: "220ms" },
          { label: "Retry state", value: "Ready" },
        ],
        codeLines: ["POST /payments/intents", "routing: primary_processor", "fraud_score: 0.08"],
      },
      {
        label: "Authorize",
        title: "Expose decisioning and fallback paths",
        description:
          "Authorization states show success, soft declines, or fallback routing without vague system language.",
        metrics: [
          { label: "Auth rate", value: "94.7%" },
          { label: "Fallback usage", value: "4%" },
          { label: "Decision clarity", value: "High" },
        ],
        codeLines: ["PATCH /payments/intents/{id}", "status: authorized", "fallback_used: false"],
      },
      {
        label: "Settle",
        title: "Move cleanly into payout and reconciliation states",
        description:
          "The interface makes settlement timing and exceptions visible to both merchants and internal teams.",
        metrics: [
          { label: "Settlement window", value: "T+1" },
          { label: "Exceptions", value: "2 queued" },
          { label: "Reconcile", value: "Auto" },
        ],
        codeLines: ["POST /payouts/run", "reconciliation: automatic", "exceptions: queued"],
      },
    ],
  },
  {
    eyebrow: "Mobile preview",
    title: "Merchant mobile app preview",
    description:
      "A companion mobile surface mirrors the product language of the web experience while prioritizing quick actions and live status.",
    steps: [
      {
        label: "Home",
        title: "Surface the next best merchant action immediately",
        description:
          "The landing screen highlights payout health, pending tasks, and customer-facing performance in a compact view.",
        metrics: [
          { label: "Task completion", value: "+31%" },
          { label: "Daily opens", value: "4.2x" },
          { label: "Error states", value: "Low" },
        ],
        codeLines: ["GET /mobile/home", "cards: payouts, tasks, alerts", "refresh: streaming"],
      },
      {
        label: "Transactions",
        title: "Make transaction review fast under real operating pressure",
        description:
          "Operators can filter, inspect, and escalate payment events from a focused transaction surface.",
        metrics: [
          { label: "Review speed", value: "+24%" },
          { label: "Filter depth", value: "6 states" },
          { label: "Escalation", value: "1 tap" },
        ],
        codeLines: ["GET /transactions?state=flagged", "filters: amount, date, source", "action: escalate"],
      },
      {
        label: "Support",
        title: "Connect merchant action to human support context",
        description:
          "Support entry points include status history and case framing so operations teams do not start blind.",
        metrics: [
          { label: "Context attached", value: "100%" },
          { label: "First response", value: "<1h" },
          { label: "Repeat issues", value: "-19%" },
        ],
        codeLines: ["POST /support/cases", "attach: merchant_state_snapshot", "priority: operational"],
      },
    ],
  },
  {
    eyebrow: "Developer experience",
    title: "API request visualizer",
    description:
      "A clear product preview that shows request shape, response state, and system health in a way decision makers can actually follow.",
    steps: [
      {
        label: "Request",
        title: "Create a predictable API envelope",
        description:
          "The preview explains how product actions map to stable request structure before implementation detail gets noisy.",
        metrics: [
          { label: "Contract coverage", value: "12 endpoints" },
          { label: "Validation", value: "Strict" },
          { label: "Versioning", value: "v1" },
        ],
        codeLines: ["POST /api/v1/payments", "{ merchant_id, amount, source }", "trace_id: generated"],
      },
      {
        label: "Response",
        title: "Return user-facing states the frontend can trust",
        description:
          "Response design focuses on predictable state naming so UI messaging remains clear during edge cases.",
        metrics: [
          { label: "State variants", value: "7" },
          { label: "Frontend mapping", value: "Clean" },
          { label: "Retry policy", value: "Typed" },
        ],
        codeLines: ["200 { status: authorized }", "402 { status: retry_required }", "409 { status: duplicate_intent }"],
      },
      {
        label: "Observe",
        title: "Tie API behavior back to support and operations signals",
        description:
          "Traceability, logging, and state history make the backend usable by operators, not just developers.",
        metrics: [
          { label: "Trace links", value: "End-to-end" },
          { label: "Alerting", value: "Live" },
          { label: "Audit trail", value: "Retained" },
        ],
        codeLines: ["trace_id -> dashboard", "alerts -> ops channel", "audit_log: enabled"],
      },
    ],
  },
];
