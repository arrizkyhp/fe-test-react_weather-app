import React from 'react'
import PropTypes from 'prop-types'

const Tanggal = ({dataCalc, timezone, waktu}) => {
   
    const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    }

    const optionsTime = {
        hour: "numeric",
        minute: "numeric",
    }

      const tanggalFull = new Date(dataCalc*1000 + (timezone*1000) +7)
      const tanggalIndonesia = tanggalFull.toLocaleDateString("en-US", options)
      const waktuIndonesia = new Date(dataCalc*1000).toLocaleTimeString("id-ID", optionsTime)

      if(waktu) {
          return (
            <h2>{waktuIndonesia} WIB</h2>
          )
      }

  return (
    <h2 className='font-bold md:font-semibold text-lg md:text-base'>{tanggalIndonesia}</h2>
  )
}

Tanggal.propTypes = {
  dataCalc: PropTypes.number,
  timezone: PropTypes.number,
  waktu: PropTypes.bool
}

export default Tanggal