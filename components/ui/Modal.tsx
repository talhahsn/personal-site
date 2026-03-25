"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { motion } from "framer-motion";

export function Modal({
  trigger,
  title,
  children,
}: {
  trigger: React.ReactNode;
  title?: string;
  children: React.ReactNode;
}) {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>

      <Dialog.Portal>
        {/* Overlay */}
        <Dialog.Overlay className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50" />

        {/* Content */}
        <Dialog.Content
          asChild
          onInteractOutside={(e) => e.preventDefault()}
          onPointerDownOutside={(e) => e.preventDefault()}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 10 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="
                fixed z-50
                left-1/2 top-1/2
                w-[90vw] max-w-2xl
                -translate-x-1/2 -translate-y-1/2
                rounded-xl bg-white p-8 shadow-2xl
                focus:outline-none
                "
          >
            <Dialog.Title className="text-2xl font-bold mb-4">
              {title || "Project details"}
            </Dialog.Title>

            {children}

            <Dialog.Close className="absolute right-4 top-4 text-gray-500 hover:text-black">
              <X />
            </Dialog.Close>
          </motion.div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
