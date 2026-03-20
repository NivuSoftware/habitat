import { toast as showToast } from "sonner";

type ToastPayload = {
  title?: string;
  description?: string;
};

function toast({ title, description }: ToastPayload) {
  return showToast(title ?? "", {
    description,
  });
}

function useToast() {
  return {
    toast,
    dismiss: showToast.dismiss,
  };
}

export { useToast, toast };
