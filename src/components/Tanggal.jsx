import React from 'react'

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
    <h2>{tanggalIndonesia}</h2>
  )
}

export default Tanggal