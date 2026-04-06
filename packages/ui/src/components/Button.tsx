// packages/ui/src/components/Button.tsx
import { forwardRef } from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../utils/cn';

const buttonVariants = cva(
  [
    'inline-flex items-center justify-center gap-2',
    'font-medium text-sm leading-none',
    'rounded transition-colors duration-150',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
    'disabled:pointer-events-none disabled:opacity-50',
    'cursor-pointer select-none whitespace-nowrap',
  ],
  {
    variants: {
      variant: {
        primary: [
          'bg-primary text-primary-foreground',
          'hover:bg-primary-hover',
        ],
        secondary: [
          'bg-secondary text-secondary-foreground',
          'hover:bg-secondary-hover',
        ],
        outline: [
          'border border-border bg-background',
          'text-foreground hover:bg-muted',
        ],
        ghost: [
          'bg-transparent text-foreground',
          'hover:bg-muted',
        ],
        destructive: [
          'bg-destructive text-destructive-foreground',
          'hover:opacity-90',
        ],
        link: [
          'bg-transparent text-primary',
          'underline-offset-4 hover:underline',
          'p-0 h-auto',
        ],
      },
      size: {
        sm: 'h-8 px-3 text-xs',
        md: 'h-10 px-4 text-sm',
        lg: 'h-12 px-6 text-base',
        icon: 'h-10 w-10 p-0',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /** Render as child element using Radix Slot */
  asChild?: boolean;
  /** Shows spinner and disables the button */
  isLoading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      isLoading = false,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : 'button';

    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        disabled={disabled || isLoading}
        aria-busy={isLoading}
        {...props}
      >
        {isLoading ? (
          <>
            <span
              className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"
              aria-hidden="true"
            />
            <span className="sr-only">Loading</span>
          </>
        ) : (
          children
        )}
      </Comp>
    );
  }
);

Button.displayName = 'Button';