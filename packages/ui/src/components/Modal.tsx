// packages/ui/src/components/Modal.tsx
import * as Dialog from '@radix-ui/react-dialog';
import { cn } from '../utils/cn';

export interface ModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
}

const sizeMap = {
  sm: 'max-w-sm',
  md: 'max-w-lg',
  lg: 'max-w-2xl',
};

export function Modal({
  open,
  onOpenChange,
  title,
  description,
  children,
  footer,
  size = 'md',
}: ModalProps) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        {/* Backdrop */}
        <Dialog.Overlay
          className={cn(
            'fixed inset-0 z-50 bg-black/50',
            'data-[state=open]:animate-in data-[state=closed]:animate-out',
            'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0'
          )}
        />

        {/* Panel */}
        <Dialog.Content
          className={cn(
            'fixed left-1/2 top-1/2 z-50 w-full',
            '-translate-x-1/2 -translate-y-1/2',
            'bg-background rounded-lg shadow-lg p-6',
            'focus:outline-none',
            'data-[state=open]:animate-in data-[state=closed]:animate-out',
            'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
            'data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
            sizeMap[size]
          )}
        >
          <div className="flex flex-col gap-4">
            {/* Header */}
            <div className="flex flex-col gap-1 pr-6">
              <Dialog.Title className="text-lg font-semibold text-foreground">
                {title}
              </Dialog.Title>
              {description && (
                <Dialog.Description className="text-sm text-muted-foreground">
                  {description}
                </Dialog.Description>
              )}
            </div>

            {/* Body */}
            <div>{children}</div>

            {/* Footer */}
            {footer && (
              <div className="flex items-center justify-end gap-2">
                {footer}
              </div>
            )}
          </div>

          {/* Close button */}
          <Dialog.Close
            className={cn(
              'absolute right-4 top-4 rounded p-1',
              'text-muted-foreground hover:text-foreground',
              'transition-colors duration-150',
              'focus:outline-none focus:ring-2 focus:ring-ring'
            )}
            aria-label="Close"
          >
            ✕
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}