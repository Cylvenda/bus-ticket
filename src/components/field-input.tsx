import { type Control, Controller, type FieldValues, type FieldPath } from 'react-hook-form'
import { Card, CardContent } from './ui/card'
import { Field, FieldDescription, FieldGroup, FieldLabel, FieldLegend, FieldSet, } from './ui/field'
import { Input } from './ui/input'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

type FormInputProps = {
    title?: string,
    description?: string,
    children: React.ReactNode
}

export const FormInput = ({ title, description, children }: FormInputProps): React.ReactElement => {
    return (
        <Card>
            <CardContent>
                <FieldGroup>
                    <FieldSet>
                        <FieldLegend>{title}</FieldLegend>
                        <FieldDescription>
                            {description}
                        </FieldDescription>
                        {children}
                    </FieldSet>
                </FieldGroup>
            </CardContent>
        </Card>
    )
}

type FieldInputProps<T extends FieldValues> = {
    type: string,
    label?: string,
    name: FieldPath<T>,
    placeholder?: string,
    value?: string,
    id?: string,
    required?: boolean,
    error?: string

    control: Control<T>
}

export const FieldInput = <T extends FieldValues>({ label, name, type, placeholder, id, required, control, value }: FieldInputProps<T>): React.ReactElement => {

    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={name}>
                        {label}
                    </FieldLabel>
                    <Input
                        {...field}
                        id={id}
                        type={type}
                        placeholder={placeholder}
                        required={required}
                        value={value}
                        aria-invalid={fieldState.invalid}
                        className="focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:border-blue-500"
                    />
                </Field>
            )}
        />
    )
}

type optionType = {
    value: string,
    label: string,
    default?: boolean
}
type FieldSelectProps<T extends FieldValues> = {
    label: string,
    options: optionType[]
    placeHolder: string,
    name: FieldPath<T>,
    control: Control<T>
}

export const FieldSelect = <T extends FieldValues>({ label, name, options, control, placeHolder }: FieldSelectProps<T>): React.ReactElement => {

    const defaultValue = options?.find((option: optionType) => option.default)?.value;

    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>{label}</FieldLabel>
                    <Select
                        defaultValue={defaultValue}
                        value={field.value}
                        onValueChange={field.onChange}>
                        <SelectTrigger className="focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:border-blue-500">
                            <SelectValue placeholder={placeHolder} />
                        </SelectTrigger>
                        <SelectContent>
                            {options?.map((option: optionType) => (
                                <SelectItem key={option.value} value={option.value} >
                                    {option.label}
                                </SelectItem>
                            ))}
                        </SelectContent>

                    </Select>
                </Field>
            )}

        />
    )
}

