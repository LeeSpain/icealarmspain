
import React from 'react';
import { FormItem, FormLabel, FormControl } from '@/components/ui/form';
import { Switch } from '@/components/ui/switch';

interface FormSectionWrapperProps {
  title: string;
  description: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}

const FormSectionWrapper: React.FC<FormSectionWrapperProps> = ({
  title,
  description,
  checked,
  onCheckedChange,
}) => {
  return (
    <FormItem className="flex flex-row items-center justify-between p-4 border rounded-lg">
      <div className="space-y-0.5">
        <FormLabel>
          {title}
        </FormLabel>
        <p className="text-sm text-muted-foreground">
          {description}
        </p>
      </div>
      <FormControl>
        <Switch
          checked={checked}
          onCheckedChange={onCheckedChange}
        />
      </FormControl>
    </FormItem>
  );
};

export default FormSectionWrapper;
