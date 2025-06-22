import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const formSchema = z.object({
    date: z.date({
        required_error: "A data é obrigatória.",
    }),
    time: z.string({
        required_error: "O horário é obrigatório.",
    }),
    duracao: z.coerce.number({
        required_error: "A duração é obrigatória.",
        invalid_type_error: "A duração deve ser um número.",
    }).min(15, "Mínimo de 15 minutos"),
    table: z.string({
        required_error: "Selecione uma mesa.",
    }),
    numberperson: z.string({
        required_error: "Número de pessoas é obrigatório.",
    }),
    observacao: z.string()
        .min(10, 'Mínimo 10 caracteres')
        .max(100, "Máximo 100 caracteres")
        .optional()
});

export type BookingFormData = z.infer<typeof formSchema>;

export const UseBookingForm = () => {
    const form = useForm<BookingFormData>({
        resolver: zodResolver(formSchema)
    });

    return { form, formSchema };
};