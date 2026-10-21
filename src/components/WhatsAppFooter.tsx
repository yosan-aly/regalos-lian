import { MessageCircle } from "lucide-react";

const buttonClass =
  "mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-cream px-6 py-3 font-bold text-forest";

export function WhatsAppFooter({ url }: { url?: string }) {
  return (
    <section className="mt-12 rounded-3xl bg-forest p-6 text-center text-primary-foreground shadow-soft">
      <p className="leading-relaxed">
        ¿Necesitas cambiar o cancelar tu elección? Escríbenos por WhatsApp para que podamos actualizar la
        disponibilidad de la lista. ¡Gracias por ayudarnos a mantenerla organizada!
      </p>
      {url ? (
        <a href={url} target="_blank" rel="noreferrer" className={buttonClass}>
          <MessageCircle className="h-5 w-5" aria-hidden /> Escribir por WhatsApp
        </a>
      ) : (
        <>
          <button type="button" disabled className={`${buttonClass} opacity-90`}>
            <MessageCircle className="h-5 w-5" aria-hidden /> Escribir por WhatsApp
          </button>
          <p className="mt-2 text-xs opacity-75">Enlace pendiente de configurar</p>
        </>
      )}
    </section>
  );
}
