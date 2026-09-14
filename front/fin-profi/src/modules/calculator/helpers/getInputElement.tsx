import { JSX } from 'react'
import { UseFormRegister, UseFormSetValue, UseFormWatch } from 'react-hook-form'

import { CAPITALIZATION_PERIOD, FormFields, FormMainNames, FormSideNames } from '../constants'
import { NumberInput } from '../components/NumberInput'
import { AdditionalSettings } from '../components/AdditionalSettings'
import { NodeWithHeader } from '../components/NodeWithHeader'
import { RadioInput } from '../components/RadioInput'
import { MultiSelectInput } from '../components/MultiSelectInput'
import { RangeInput } from '../components/RangeInput'
import { Period } from '../components/Period'

export function getInputElement(
  name: FormMainNames | FormSideNames,
  register: UseFormRegister<FormFields>,
  watch: UseFormWatch<FormFields>,
  setValues?: UseFormSetValue<FormFields>
) {
  const map = new Map<FormMainNames | FormSideNames, JSX.Element>([
    [
      "initial-amount",
      <NumberInput
        key="initial-amount"
        register={register}
        name="initial-amount"
        text="Начальная сумма"
        blockSize="large"
      />
    ],
    [
      "monthly-deposit",
      <NumberInput
        key="monthly-deposit"
        register={register}
        name="monthly-deposit"
        text="Ежемесячное пополнение"
        blockSize="large"
      />
    ],
    [
      "additional-settings",
      <AdditionalSettings
        key="additional-settings"
        register={register}
        setValue={setValues}
      />
    ],
    [
      "capitalization",
      <NodeWithHeader
        key="capitalization"
        className="capitalization"
        text="Капитализация"
        style={{ paddingBottom: 30 }}
      >
        <RadioInput
          id="monthly"
          name="capitalization"
          value={CAPITALIZATION_PERIOD.MONTHLY}
          text="Ежемесячно"
          register={register}
          defaultChecked
        />

        <RadioInput
          id="quarterly"
          name="capitalization"
          value={CAPITALIZATION_PERIOD.QUARTERLY}
          text="Ежеквартально"
          register={register}
        />

        <RadioInput
          id="yearly"
          name="capitalization"
          value={CAPITALIZATION_PERIOD.YEARLY}
          text="Ежегодно"
          register={register}
        />
      </NodeWithHeader>
    ],
    [
      "investment-method",
      <NodeWithHeader
        key="investment-method"
        className="investment-method"
        text="Метод инвестирования"
      >
        <MultiSelectInput register={register} />
      </NodeWithHeader>
    ],
    [
      "annual-rate",
      <RangeInput
        key="annual-rate"
        id="annual-rate"
        text="Процентная ставка (годовых)"
        from={1}
        to={30}
        register={register}
        watch={watch}
        units="%"
      />
    ],
    [
      "period",
      <Period
        register={register}
        watch={watch}
      />
    ]
  ])

  return map.get(name) ?? null
}