export interface PromptItem {
    id: string;
    imageUrl: string;
    title: string;
    prompt: string;
    tags: string[];
    cameraAngle: 'Original' | 'Low Angle' | 'Eye Level';
}

export type CopiedState = string | null; // Stores the ID of the copied item