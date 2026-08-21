import { UseFormRegister, UseFormWatch } from 'react-hook-form'

import { RangeInput } from './RangeInput'
import { FormFields, PERIOD, PeriodType } from '../constants'
import { periodUnitsAdapter } from '../helpers'
import { motion, MotionProps } from 'framer-motion'
import { RefObject, useCallback, useEffect, useRef, useState } from 'react'

type PeriodProps = {
  register: UseFormRegister<FormFields>,
  watch: UseFormWatch<FormFields>,
}

export function Period({ register, watch }: PeriodProps) {
  const period = Number(watch("period-type")) as PeriodType

  const yearsBtnWidth = useRef(0)
  const monthsBtnWidth = useRef(0)

  const getWidth = (ref: RefObject<number>) =>
    useCallback((node: HTMLLabelElement | null) => {
      if (!node) return

      ref.current = node.clientWidth
    }, [])

  const animation: MotionProps = {
    initial: { width: 0 },
    animate: period === PERIOD.MONTHS ? {
      left: yearsBtnWidth.current,
      right: 0,
      width: monthsBtnWidth.current
    } : {
      left: 0,
      right: monthsBtnWidth.current,
      width: yearsBtnWidth.current
    }
  }

  return (
    <RangeInput
      key="period"
      id="period"
      text="Срок инвестирования"
      from={1}
      to={period === PERIOD.MONTHS ? 60 : 50}
      register={register}
      watch={watch}
      units={periodUnitsAdapter(period)}
    >
      <div className="period-switcher">
        <motion.div
          className="floating-background"
          {...animation}
        ></motion.div>

        <label ref={getWidth(yearsBtnWidth)}>
          <input
            type="radio"
            value={PERIOD.YEARS}
            {...register("period-type")}
            defaultChecked
          />
          <span className="label">год</span>
        </label>

        <label ref={getWidth(monthsBtnWidth)}>
          <input
            type="radio"
            value={PERIOD.MONTHS}
            {...register("period-type")}
          />
          <span className="label">месяц</span>
        </label>
      </div>
    </RangeInput>
  )
}
