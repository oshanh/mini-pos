import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/lib/utils';

const alertVariants = cva(
    'relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground',
    {
        variants: {
            variant: {
                default: 'bg-background text-foreground',
                success: 'border-green-500/50 text-green-500 dark:border-green-500 [&>svg]:text-green-500',
                destructive: 'border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive',
            },
        },
        defaultVariants: {
            variant: 'default',
        },
    },
);

interface AlertProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof alertVariants> {
    dismissAfterMs?: number;
    onDismiss?: () => void;
}

const Alert = React.forwardRef<HTMLDivElement, Readonly<AlertProps>>(({ className, variant, dismissAfterMs, onDismiss, ...props }, ref) => {
    const [visible, setVisible] = React.useState(true);

    React.useEffect(() => {
        if (dismissAfterMs == null) {
            return;
        }

        const timer = globalThis.setTimeout(() => {
            setVisible(false);
            onDismiss?.();
        }, dismissAfterMs);

        return () => globalThis.clearTimeout(timer);
    }, [dismissAfterMs, onDismiss]);

    if (!visible) {
        return null;
    }

    return <div ref={ref} role="alert" className={cn(alertVariants({ variant }), className)} {...props} />;
});
Alert.displayName = 'Alert';

const AlertTitle = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
    <div ref={ref} className={cn('mb-1 font-medium leading-none tracking-tight', className)} {...props} />
));
AlertTitle.displayName = 'AlertTitle';

const AlertDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(({ className, ...props }, ref) => (
    <div ref={ref} className={cn('text-sm [&_p]:leading-relaxed', className)} {...props} />
));
AlertDescription.displayName = 'AlertDescription';

export { Alert, AlertDescription, AlertTitle };
