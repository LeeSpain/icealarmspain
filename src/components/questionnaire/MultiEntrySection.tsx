
import React from "react";
import { Button } from "@/components/ui/button";
import { Plus, Minus } from "lucide-react";
import SubQuestionInput from "./SubQuestionInput";
import { Question, MultiEntry } from "./types";

interface MultiEntrySectionProps {
  question: Question;
  entries: MultiEntry[];
  language: string;
  onAddEntry: () => void;
  onRemoveEntry: (entryId: string) => void;
  onEntryChange: (entryId: string, subQuestionId: string, value: string) => void;
}

const MultiEntrySection: React.FC<MultiEntrySectionProps> = ({
  question,
  entries,
  language,
  onAddEntry,
  onRemoveEntry,
  onEntryChange,
}) => {
  return (
    <div className="space-y-8">
      {/* Render multiple entries */}
      {entries.map((entry, entryIndex) => (
        <div
          key={entry._id}
          className="border rounded-lg p-4 relative space-y-4"
        >
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-medium">
              {language === "en"
                ? `${question.titleEn} ${entryIndex + 1}`
                : `${question.titleEs} ${entryIndex + 1}`}
            </h3>
            {entries.length > 1 && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => onRemoveEntry(entry._id)}
                className="text-red-500 hover:text-red-700"
                aria-label="Remove entry"
              >
                <Minus className="h-4 w-4" />
              </Button>
            )}
          </div>

          {/* Render sub-questions for this entry */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {question.subQuestions.map((subQuestion) => (
              <SubQuestionInput
                key={subQuestion.id}
                questionId={question.id}
                subQuestion={subQuestion}
                language={language}
                value={entry[subQuestion.id] || ""}
                onChange={(value) => 
                  onEntryChange(entry._id, subQuestion.id, value as string)
                }
                entryId={entry._id}
              />
            ))}
          </div>
        </div>
      ))}

      {/* Add button for multiple entries */}
      <Button
        variant="outline"
        onClick={onAddEntry}
        className="w-full"
      >
        <Plus className="h-4 w-4 mr-2" />
        {language === "en"
          ? `Add Another ${question.titleEn}`
          : `Agregar Otro ${question.titleEs}`}
      </Button>
    </div>
  );
};

export default MultiEntrySection;
