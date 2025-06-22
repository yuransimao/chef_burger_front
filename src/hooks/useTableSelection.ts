import { useCallback, useEffect} from "react";
import {Mesa} from '@/interface/mesa.interface'

export const UseTableSelection = (form: any, mesas: Mesa[] | undefined) => {
    const getMesaSelecionada = useCallback((mesaId: string) => {
        return mesas?.find(mesa => mesa.id.toString() === mesaId);
    }, [mesas]);

    const selectedTable = form.watch("table");
    useEffect(() => {
        const selectedTable = form.watch("table");
        if (selectedTable && mesas) {
            const mesaSelecionada = getMesaSelecionada(selectedTable);
            if (mesaSelecionada) {
                form.setValue("numberperson", mesaSelecionada.capacidade.toString());
            }
        }
    }, [selectedTable, mesas, form, getMesaSelecionada]);

    return { getMesaSelecionada };
};