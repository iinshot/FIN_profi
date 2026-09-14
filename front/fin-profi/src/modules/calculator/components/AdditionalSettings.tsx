import { UseFormRegister, UseFormSetValue } from 'react-hook-form'
import { useState } from 'react'

import { Check } from '@/assets/icons'

import { NodeWithHeader } from './NodeWithHeader'
import { NumberInput } from './NumberInput'
import { FormFields } from '../constants'

type AdditionalSettingsProps = {
  register: UseFormRegister<FormFields>,
  setValue?: UseFormSetValue<FormFields>
}

export function AdditionalSettings({ register, setValue }: AdditionalSettingsProps) {
  const [disableInflation, setDisableInflation] = useState(true)
  const [disableTax, setDisableTax] = useState(true)

  return (
    <NodeWithHeader
      style={{ paddingBottom: 30 }}
      text="Доп. настройки"
      className="additional-settings"
    >
      <div className="checkbox-input">
        <input type="checkbox" id="inflation" />

        <label
          className="checkbox"
          htmlFor="inflation"
          onClick={() => {
            setDisableInflation(!disableInflation)

            if (!disableInflation) {
              setValue?.("additional-settings.inflation", '')
            }
          }}
        >
          <Check width={12} height={12} />
        </label>

        <NumberInput
          key="additional-settings.inflation"
          register={register}
          name="additional-settings.inflation"
          text="Инфляция"
          blockSize="small"
          disabled={disableInflation}
        />
      </div>

      <div className="checkbox-input">
        <input type="checkbox" id="tax" />

        <label
          className="checkbox"
          htmlFor="tax"
          onClick={() => {
            setDisableTax(!disableTax)

            if (!disableTax) {
              setValue?.("additional-settings.tax", '')
            }
          }}
        >
          <Check width={12} height={12} />
        </label>

        <NumberInput
          key="additional-settings.tax"
          register={register}
          name="additional-settings.tax"
          text="Налог"
          blockSize="small"
          disabled={disableTax}
        />
      </div>
    </NodeWithHeader>
  )
}
