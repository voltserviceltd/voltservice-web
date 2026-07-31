export type DemoStep = {
  label: string;
  title: string;
  description: string;
  metrics: { label: string; value: string }[];
  codeLines: string[];
};

export type DemoScenario = {
  eyebrow: string;
  title: string;
  description: string;
  steps: DemoStep[];
};
