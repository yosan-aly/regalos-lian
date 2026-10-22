import { MessageCircle } from "lucide-react";

/** Aviso final: enlace a WhatsApp para cambiar o cancelar una elección. */
export function ChangeNotice({ whatsappUrl }: { whatsappUrl: string }) {
  return (
    <section className="mt-12 rounded-3xl bg-forest p-6 text-center text-primary-foreground shadow-soft">
      <p className="leading-relaxed">
        ¿Necesitas cambiar o cancelar tu elección? Escríbenos por WhatsApp para que podamos actualizar la
        disponibilidad de la lista.
      </p>
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-cream px-6 py-3 font-bold text-forest transition hover:brightness-95"
      >
        <MessageCircle className="h-5 w-5" aria-hidden /> Escríbenos por WhatsApp
      </a>
    </section>
  );
}
