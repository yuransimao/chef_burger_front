import {useCallback, useState} from "react"

export const UseAvailabilityCheck = () => {
    const [shouldCheckAvailability, setShouldCheckAvailability] = useState(false);

    const getDataHoraForCheck = useCallback((date: Date , time: string ) => {
               if (!date || !time || !time.includes(":")) return '';

        const [hours, minutes] = time.split(":");
        const dateHora = new Date(date);
        dateHora.setHours(Number(hours));
        dateHora.setMinutes(Number(minutes));
        dateHora.setSeconds(0);

        return dateHora.toISOString();

    }, []);

    return {
        shouldCheckAvailability,
        setShouldCheckAvailability,
        getDataHoraForCheck
    };
};