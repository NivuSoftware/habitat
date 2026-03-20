import { Toaster as Sonner } from "sonner";

const Toaster = () => (
  <Sonner
    position="top-right"
    richColors
    toastOptions={{
      classNames: {
        toast: "border border-border bg-card text-foreground",
        title: "text-sm font-semibold",
        description: "text-sm text-muted-foreground",
      },
    }}
  />
);

export { Toaster };
