export const UI_TEXT = {
  appName: "เครื่องคำนวณค่าไฟบ้าน (ประมาณการ)",
  shortDescription: "ช่วยเปรียบเทียบค่าไฟเดิมและค่าไฟใหม่แบบเข้าใจง่าย",
  estimateNote: "ผลลัพธ์เป็นการประมาณค่าเพื่อช่วยตัดสินใจเบื้องต้น",
  nav: {
    home: "หน้าแรก",
    normal: "มิเตอร์ปกติ",
    tou: "มิเตอร์ TOU",
    help: "วิธีใช้งาน"
  },
  home: {
    normalButton: "คำนวณมิเตอร์ปกติ",
    touButton: "คำนวณมิเตอร์ TOU",
    howToTitle: "วิธีใช้งานแบบง่าย",
    howToSteps: [
      "เลือกประเภทมิเตอร์: ปกติ หรือ TOU",
      "เลือกวิธีกรอก: รู้หน่วยไฟ หรือรู้ยอดบิล",
      "กรอกข้อมูล แล้วกดคำนวณ",
      "ดูค่าไฟเดิม ค่าไฟใหม่ และส่วนต่างทันที"
    ],
    importantTitle: "หมายเหตุสำคัญ",
    importantBody:
      "ตัวเลขนี้เป็นการประมาณจากอัตราที่ตั้งค่าไว้ อาจต่างจากบิลจริงตามรอบบิล รายละเอียดค่าบริการ และการเปลี่ยนแปลงอัตราในอนาคต"
  },
  common: {
    calculateButton: "คำนวณ",
    clearButton: "ล้างข้อมูล",
    resultTitle: "ผลลัพธ์โดยประมาณ",
    notesTitle: "ข้อควรทราบ",
    monthlyUnitsLabel: "หน่วยที่ใช้ต่อเดือน",
    estimatedSuffix: "(ประมาณ)",
    peakShortLabel: "Peak",
    offPeakShortLabel: "Off-Peak",
    unitLabel: "หน่วย",
    bahtPerUnitLabel: "บาท/หน่วย",
    modeSelectorNormalAria: "เลือกวิธีกรอกข้อมูล",
    modeSelectorTouAria: "เลือกวิธีกรอกข้อมูล TOU",
    oldBill: "ค่าไฟเดิม",
    newBill: "ค่าไฟใหม่",
    increase: "เพิ่มขึ้น",
    summaryPrefix: "บิลของคุณอาจเพิ่มประมาณ",
    summarySuffix: "ต่อเดือน",
    seeDetails: "ดูรายละเอียดการคำนวณ",
    estimationBadge: "ข้อมูลนี้เป็นการประมาณ",
    details: {
      inputValues: "ข้อมูลที่กรอก",
      estimatedUnits: "หน่วยที่ระบบประเมิน",
      energyChargeOld: "ค่าไฟฐาน (เดิม)",
      energyChargeNew: "ค่าไฟฐาน (ใหม่)",
      serviceCharge: "ค่าบริการรายเดือน",
      ftOld: "ค่า Ft เดิม",
      ftNew: "ค่า Ft ใหม่",
      vatOld: "VAT 7% (เดิม)",
      vatNew: "VAT 7% (ใหม่)",
      oldTotal: "รวมค่าไฟเดิม",
      newTotal: "รวมค่าไฟใหม่",
      difference: "ส่วนต่าง"
    }
  },
  normal: {
    title: "คำนวณค่าไฟมิเตอร์ปกติ",
    subtitle: "เลือกวิธีกรอกข้อมูลที่สะดวกที่สุด",
    modeUnits: "ฉันรู้หน่วยไฟ",
    modeBill: "ฉันรู้ยอดบิล",
    unitsLabel: "หน่วยไฟต่อเดือน (หน่วย)",
    unitsPlaceholder: "เช่น 350",
    billLabel: "ยอดบิลเดิมโดยประมาณ (บาท)",
    billPlaceholder: "เช่น 1800",
    estimatedUnitsNote: "จำนวนหน่วยด้านล่างเป็นค่าประมาณจากยอดบิลที่กรอก"
  },
  tou: {
    title: "คำนวณค่าไฟมิเตอร์ TOU",
    subtitle: "รองรับทั้งกรอกหน่วย Peak/Off-Peak และกรอกจากยอดบิล",
    modeUnits: "ฉันรู้หน่วย Peak / Off-Peak",
    modeBill: "ฉันรู้ยอดบิล",
    peakLabel: "หน่วยช่วง Peak",
    peakPlaceholder: "เช่น 120",
    offPeakLabel: "หน่วยช่วง Off-Peak",
    offPeakPlaceholder: "เช่น 260",
    billLabel: "ยอดบิลเดิมโดยประมาณ (บาท)",
    billPlaceholder: "เช่น 2200",
    patternLabel: "รูปแบบการใช้ไฟ",
    patterns: {
      mostlyDaytime: "ใช้ช่วงกลางวันเป็นส่วนใหญ่",
      balanced: "ใช้ใกล้เคียงกัน",
      mostlyNighttime: "ใช้ช่วงกลางคืนเป็นส่วนใหญ่"
    },
    touTimeTitle: "ช่วงเวลา TOU",
    touTimeLines: [
      "Peak: วันจันทร์-ศุกร์ เวลา 09:00-22:00",
      "Off-Peak: วันจันทร์-ศุกร์ เวลา 22:00-09:00",
      "วันเสาร์-อาทิตย์ และวันหยุดราชการปกติ ถือเป็น Off-Peak"
    ],
    estimatedUnitsNote: "Peak/Off-Peak ที่แสดงเป็นการประเมินจากยอดบิลและรูปแบบการใช้ไฟ"
  },
  disclaimers: {
    estimateOnly: "นี่คือการประมาณการเท่านั้น",
    billMayDiffer: "บิลจริงอาจแตกต่างจากผลลัพธ์ในระบบ",
    futureTariffMayChange: "อัตราค่าไฟอาจมีการเปลี่ยนแปลงในอนาคต",
    touDependsOnTiming: "TOU คิดค่าไฟตามช่วงเวลาที่ใช้ไฟ"
  },
  help: {
    title: "ข้อมูลช่วยเหลือ",
    intro: "หน้านี้สรุปแนวคิดการคำนวณแบบสั้นและเข้าใจง่าย",
    points: [
      "ระบบใช้หน่วยไฟ ค่าบริการ ค่า Ft และ VAT 7% ในการคำนวณ",
      "โหมดกรอกจากบิล ใช้วิธีประมาณหน่วยด้วยการค้นหาแบบขั้นบันได (binary search)",
      "หากใช้มิเตอร์ TOU และกรอกจากบิล ระบบจะแบ่ง Peak/Off-Peak ตามรูปแบบการใช้ไฟที่เลือก"
    ]
  },
  validation: {
    required: "กรุณากรอกข้อมูล",
    nonNegative: "กรุณากรอกตัวเลขตั้งแต่ 0 ขึ้นไป",
    validNumber: "กรุณากรอกเป็นตัวเลข"
  },
  footerNote: "พัฒนาเพื่อช่วยประเมินค่าไฟบ้านอย่างเข้าใจง่ายสำหรับทุกวัย"
} as const;
