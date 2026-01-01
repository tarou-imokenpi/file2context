"use client";

import { useState, useCallback } from "react";
import type { FileWithPath } from "@/types/fileSystem";

export function usePastedText(
  processFiles: (files: FileWithPath[]) => Promise<void>,
  isProcessing: boolean
) {
  const [pastedText, setPastedText] = useState("");
  const [pastedFileName, setPastedFileName] = useState("");

  const handleAddPastedText = useCallback(async () => {
    const text = pastedText;
    if (!text.trim()) return;

    const safeName = (pastedFileName.trim() || `pasted-text-${Date.now()}.txt`)
      .replaceAll("/", "_")
      .replaceAll("\\", "_");
    const file = new File([text], safeName, { type: "text/plain" });
    const path = `pasted/${safeName}`;

    setPastedText("");
    setPastedFileName("");
    await processFiles([{ file, path }]);
  }, [pastedFileName, pastedText, processFiles]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
        e.preventDefault();
        void handleAddPastedText();
      }
    },
    [handleAddPastedText]
  );

  const canAdd = !isProcessing && pastedText.trim().length > 0;

  return {
    pastedText,
    setPastedText,
    pastedFileName,
    setPastedFileName,
    handleAddPastedText,
    handleKeyDown,
    canAdd,
  };
}
