import { useCallback } from "react";
import { useCriarReserva, useAuth} from "./"
import  {BookingFormData} from "./useBookingForm"
import {useAppDispatch} from "@/hooks"
import {closeModalDialog} from "@/store/modalSlice"
export const UseBookingSubmit = () => {
    const { user_id } = useAuth();
    const criarReservaMutation = useCriarReserva();
    const dispatch = useAppDispatch()

    const submitBooking = useCallback((
        data: BookingFormData,
        disponibilidade: any,
        form: any,
        setShouldCheckAvailability: (value: boolean) => void
    ) => {
        if (!user_id) {
            console.error('Usuário não autenticado');
            return;
        }

        if (disponibilidade && !disponibilidade.disponivel) {
            form.setError('root', {
                message: 'Mesa não disponível no horário selecionado'
            });
            return;
        }

        const [hours, minutes, seconds = "0"] = data.time.split(":");
        const dateHora = new Date(data.date);
        dateHora.setHours(Number(hours));
        dateHora.setMinutes(Number(minutes));
        dateHora.setSeconds(Number(seconds));

        const payload = {
            dataHora: dateHora.toISOString(),
            duracao: data.duracao,
            numerosPessoas: parseInt(data.numberperson),
            observacoes: data.observacao || undefined,
            mesaId: Number(data.table),
        };

        criarReservaMutation.mutate(payload, {
            onSuccess: () => {
                form.reset();
                dispatch(closeModalDialog())
                setShouldCheckAvailability(false);
            }
        });
    }, [user_id, criarReservaMutation,dispatch]);

    return {
        submitBooking,
        criarReservaMutation
    };
};
