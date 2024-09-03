import { RegExpMatcher, englishDataset, englishRecommendedTransformers } from "obscenity";

const matcher = new RegExpMatcher({
  ...englishDataset.build(),
  ...englishRecommendedTransformers,
});

export function checkForObscenities(content: string): void {
  if (matcher.hasMatch(content)) {
    throw new Error("Potentially offensive content detected. Operation aborted.");
  }
}

export function warnAboutImageContent(): void {
  console.warn(
    "Please ensure the uploaded image does not contain any inappropriate or offensive content."
  );
}
