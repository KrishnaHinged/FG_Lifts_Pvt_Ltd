export const FORMS = Object.freeze({
  ELEVATOR_OPTIONS: Object.freeze([
    { label: 'Passenger Elevator', value: 'Passenger' },
    { label: 'Observation / Capsule Lift', value: 'Capsule' },
    { label: 'Luxury Villa Home Lift', value: 'Home' },
    { label: 'Hospital Stretcher Lift', value: 'Hospital' },
    { label: 'Heavy Industrial Goods Lift', value: 'Goods' }
  ]),
  FLOOR_OPTIONS: Object.freeze([
    { label: '2 - 3 Floors', value: '2-3' },
    { label: '4 - 7 Floors', value: '4-7' },
    { label: '8 - 15 Floors', value: '8-15' },
    { label: '16+ Floors', value: '16+' }
  ])
})

export default FORMS
