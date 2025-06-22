"use client"
import React, { useEffect } from 'react'
import { cn } from "@/lib/utils"
import { CalendarIcon } from "lucide-react"
import {
    Button, Calendar, Input, Form, FormControl, FormField, FormItem,
    FormLabel, FormMessage, Select,
    SelectContent, SelectItem, SelectTrigger, SelectValue, Toaster, Popover,
    PopoverContent,
    PopoverTrigger, Textarea
} from "./ui"
import { TimeInput } from './timeInput'
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"

import { useVerificarDisponibilidade, useMesasDisponiveis } from '@/hooks'
import {
    UseBookingForm,
    UseAvailabilityCheck,
    UseTableSelection,
    UseBookingSubmit,
    UseAvailabilityStatus,
     BookingFormData
} from '@/hooks'

function FormBooking() {
    const { form } = UseBookingForm();
    const { shouldCheckAvailability, setShouldCheckAvailability, getDataHoraForCheck } = UseAvailabilityCheck();
    const { submitBooking, criarReservaMutation } = UseBookingSubmit();
    const { renderAvailabilityStatus } = UseAvailabilityStatus();
    
    
    const { data: mesas, isLoading: isLoadingMesas, error: errorMesas } = useMesasDisponiveis();
    
    
    UseTableSelection(form, mesas);
    
   
    const selectedDate = form.watch("date");
    const selectedTime = form.watch("time");
    const selectedDuration = form.watch("duracao");
    const selectedTable = form.watch("table");

   
    const {
        data: disponibilidade,
        isLoading: isCheckingAvailability,
        error: availabilityError
    } = useVerificarDisponibilidade(
        selectedTable,
        getDataHoraForCheck(selectedDate, selectedTime),
        selectedDuration,
        shouldCheckAvailability
    );

    
    useEffect(() => {
        const hasAllFields = selectedDate && selectedTime && selectedDuration && selectedTable;
        setShouldCheckAvailability(!!hasAllFields);
    }, [selectedDate, selectedTime, selectedDuration, selectedTable, setShouldCheckAvailability]);

    const onSubmit = (data: BookingFormData) => {
        submitBooking(data, disponibilidade, form, setShouldCheckAvailability);
    };

    return (
        <Form {...form}>
            <Toaster />
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="py-4 w-full space-y-5 h-full flex flex-col justify-center"
            >
                <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                        <FormItem className="flex flex-col">
                            <FormLabel>Data</FormLabel>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <FormControl>
                                        <Button
                                            variant={"outline"}
                                            className={cn(
                                                "w-full pl-3 text-left font-normal",
                                                !field.value && "text-muted-foreground"
                                            )}
                                        >
                                            {field.value ? (
                                                format(field.value, "PPP", { locale: ptBR })
                                            ) : (
                                                <span>Seleciona data</span>
                                            )}
                                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                        </Button>
                                    </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar
                                        mode="single"
                                        selected={field.value}
                                        onSelect={field.onChange}
                                        locale={ptBR}
                                        disabled={(date) =>
                                            date < new Date(new Date().setHours(0, 0, 0, 0))
                                        }
                                        captionLayout="dropdown"
                                    />
                                </PopoverContent>
                            </Popover>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className='flex items-center w-full gap-3'>
                    <FormField
                        control={form.control}
                        name="time"
                        render={({ field }) => (
                            <FormItem className='w-1/2'>
                                <FormLabel>Horário</FormLabel>
                                <FormControl>
                                    <TimeInput
                                         
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="duracao"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Duração (min)</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Digite duração"
                                        {...field}
                                        className="rounded"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <div className='flex items-center gap-3'>
                    <FormField
                        control={form.control}
                        name="table"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Mesa</FormLabel>
                                <FormControl>
                                    <Select
                                        value={field.value}
                                        onValueChange={field.onChange}
                                        disabled={isLoadingMesas}
                                    >
                                        <SelectTrigger className="rounded">
                                            <SelectValue
                                                placeholder={
                                                    isLoadingMesas
                                                        ? "Carregando mesas..."
                                                        : "Selecione uma mesa"
                                                }
                                            />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {errorMesas ? (
                                                <SelectItem value="" disabled>
                                                    Erro ao carregar mesas
                                                </SelectItem>
                                            ) : mesas?.length === 0 ? (
                                                <SelectItem value="" disabled>
                                                    Nenhuma mesa disponível
                                                </SelectItem>
                                            ) : (
                                                mesas?.map((mesa) => (
                                                    <SelectItem
                                                        key={mesa.id}
                                                        value={mesa.id.toString()}
                                                    >
                                                        Mesa {mesa.numero} - {mesa.capacidade} pessoas
                                                    </SelectItem>
                                                ))
                                            )}
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="numberperson"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Número de Pessoas</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Capacidade da mesa"
                                        {...field}
                                        className="rounded"
                                        readOnly
                                        disabled
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                {renderAvailabilityStatus(
                    shouldCheckAvailability,
                    isCheckingAvailability,
                    availabilityError,
                    disponibilidade
                )}

                <FormField
                    control={form.control}
                    name="observacao"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Observações</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Alguma observação especial para sua reserva..."
                                    className="resize-none"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {form.formState.errors.root && (
                    <div className="text-sm text-red-600">
                        {form.formState.errors.root.message}
                    </div>
                )}

                <Button
                    type="submit"
                    className=""
                    disabled={
                        isLoadingMesas ||
                        criarReservaMutation.isPending ||
                        (disponibilidade && !disponibilidade.disponivel)
                    }
                >
                    <h3 className="text-sm">
                        {criarReservaMutation.isPending
                            ? "Criando reserva..."
                            : isLoadingMesas
                                ? "Carregando..."
                                : "Fazer Reserva"
                        }
                    </h3>
                </Button>
            </form>
        </Form>
    )
}

export { FormBooking }