// apps/web/src/components/HomePage.tsx
import { Button, Input, Modal } from '@repo/ui';
import { useState } from 'react';
import { useThemeStore } from '../hooks/useThemeStore';

export function HomePage() {
  const { tenantId, loadTheme, resetTheme } = useThemeStore();
  const [modalOpen, setModalOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [inputError, setInputError] = useState('');

  function handleValidate() {
    if (!inputValue) {
      setInputError('This field is required');
    } else {
      setInputError('');
      setModalOpen(true);
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground">

      {/* ── Header ─────────────────────────────────────────── */}
      <header className="border-b border-border px-6 py-4">
        <div className="mx-auto flex max-w-4xl items-center justify-between">
          <h1 className="text-xl font-bold text-foreground">
            My App
          </h1>
          <span className="rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground">
            {tenantId ? `Tenant: ${tenantId}` : 'Default theme'}
          </span>
        </div>
      </header>

      {/* ── Main ───────────────────────────────────────────── */}
      <main className="mx-auto max-w-4xl px-6 py-12">
        <div className="flex flex-col gap-10">

          {/* Title */}
          <div className="flex flex-col gap-2">
            <h2 className="text-3xl font-bold">
              Monorepo + White Label Demo
            </h2>
            <p className="text-muted-foreground">
              Switch tenants below or use{' '}
              <code className="rounded bg-muted px-1 py-0.5 text-xs font-mono">
                ?tenant=tenant-a
              </code>{' '}
              in the URL.
            </p>
          </div>

          {/* ── Tenant switcher ──────────────────────────── */}
          <section className="flex flex-col gap-3">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              Switch Tenant
            </h3>
            <div className="flex flex-wrap gap-3">
              <Button onClick={() => loadTheme('tenant-a')}>
                Tenant A — Purple
              </Button>
              <Button onClick={() => loadTheme('tenant-b')}>
                Tenant B — Green
              </Button>
              <Button variant="outline" onClick={resetTheme}>
                Reset to Default
              </Button>
            </div>
          </section>

          {/* ── Button variants ──────────────────────────── */}
          <section className="flex flex-col gap-3">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              Button Variants
            </h3>
            <div className="flex flex-wrap gap-3">
              <Button variant="primary">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="destructive">Destructive</Button>
              <Button variant="link">Link</Button>
              <Button isLoading>Loading</Button>
              <Button disabled>Disabled</Button>
            </div>
          </section>

          {/* ── Button sizes ─────────────────────────────── */}
          <section className="flex flex-col gap-3">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              Button Sizes
            </h3>
            <div className="flex flex-wrap items-center gap-3">
              <Button size="sm">Small</Button>
              <Button size="md">Medium</Button>
              <Button size="lg">Large</Button>
            </div>
          </section>

          {/* ── Input variants ───────────────────────────── */}
          <section className="flex flex-col gap-4">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              Input Variants
            </h3>
            <div className="grid gap-4 sm:grid-cols-2">
              <Input
                label="Default Input"
                placeholder="Enter text..."
              />
              <Input
                label="With Hint"
                placeholder="Enter email..."
                hint="We'll never share your email."
              />
              <Input
                label="Validated Input"
                placeholder="Required field..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                error={inputError}
              />
              <Input
                label="Disabled Input"
                placeholder="Cannot edit..."
                disabled
              />
            </div>
            <div>
              <Button onClick={handleValidate}>
                Validate & Open Modal
              </Button>
            </div>
          </section>

          {/* ── Color tokens preview ─────────────────────── */}
          <section className="flex flex-col gap-3">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              Active Color Tokens
            </h3>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
              {[
                {
                  label: 'Primary',
                  bg: 'bg-primary',
                  text: 'text-primary-foreground',
                },
                {
                  label: 'Secondary',
                  bg: 'bg-secondary',
                  text: 'text-secondary-foreground',
                },
                {
                  label: 'Muted',
                  bg: 'bg-muted',
                  text: 'text-muted-foreground',
                },
                {
                  label: 'Destructive',
                  bg: 'bg-destructive',
                  text: 'text-destructive-foreground',
                },
                {
                  label: 'Success',
                  bg: 'bg-success',
                  text: 'text-success-foreground',
                },
                {
                  label: 'Warning',
                  bg: 'bg-warning',
                  text: 'text-warning-foreground',
                },
                {
                  label: 'Background',
                  bg: 'bg-background border border-border',
                  text: 'text-foreground',
                },
                {
                  label: 'Border',
                  bg: 'bg-border',
                  text: 'text-foreground',
                },
              ].map(({ label, bg, text }) => (
                <div
                  key={label}
                  className={`${bg} ${text} rounded-lg p-4 text-center text-sm font-medium shadow-sm`}
                >
                  {label}
                </div>
              ))}
            </div>
          </section>

        </div>
      </main>

      {/* ── Modal ──────────────────────────────────────────── */}
      <Modal
        open={modalOpen}
        onOpenChange={setModalOpen}
        title="Validation Passed"
        description="Your input has been validated successfully."
        footer={
          <>
            <Button
              variant="outline"
              onClick={() => setModalOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={() => setModalOpen(false)}>
              Confirm
            </Button>
          </>
        }
      >
        <div className="rounded-lg bg-muted p-4 text-sm text-foreground">
          You entered:{' '}
          <span className="font-semibold">"{inputValue}"</span>
        </div>
      </Modal>

    </div>
  );
}