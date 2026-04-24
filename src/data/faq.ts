/**
 * FAQ content and types for Lempira.
 *
 * The `answer` field is plain text for the JSON-LD FAQPage schema (Google reads
 * this). The `blocks` array describes the rich visual content rendered by the
 * FAQ component.
 */

export interface FormulaBlock {
  type: "formula";
  /** Defaults to "Fórmula" when omitted. */
  label?: string;
  /** Name of the variable on the left-hand side of the formula. */
  result: string;
  /** Expression on the right-hand side of the `=` sign. */
  expression: string;
}

export interface ParagraphBlock {
  type: "paragraph";
  /** HTML content. `<strong>` and `<em>` are styled by the FAQ component. */
  html: string;
  /** When true, renders the paragraph with a more muted color. */
  muted?: boolean;
}

export interface CalloutBlock {
  type: "callout";
  /** HTML content. Wrap the product name with `<span class="product-name">…</span>`. */
  html: string;
}

export interface StatItem {
  label: string;
  value: string;
  description: string;
}

export interface StatsBlock {
  type: "stats";
  items: StatItem[];
}

export interface BulletsBlock {
  type: "bullets";
  /** HTML content per bullet. */
  items: string[];
}

export type FAQBlock =
  | FormulaBlock
  | ParagraphBlock
  | CalloutBlock
  | StatsBlock
  | BulletsBlock;

export interface FAQItemData {
  question: string;
  /** Plain-text answer for JSON-LD FAQPage schema (no HTML). */
  answer: string;
  blocks: FAQBlock[];
  /** When true, the FAQ card starts expanded. */
  defaultOpen?: boolean;
}

export const faqData: FAQItemData[] = [
  {
    question: "¿Cómo calcular el precio de venta de un producto?",
    answer:
      "Para calcular el precio de venta, sumá al costo base tu porcentaje de ganancia, los costos de publicidad y otros gastos. Después aplicá el IVA sobre el subtotal y la comisión bancaria si vendés con tarjeta. La fórmula es: Precio final = (Costo + Ganancia + Publicidad + Otros) + IVA + Comisión. Con Lempira hacés todo esto automáticamente: ingresás el costo y los porcentajes, y obtenés el precio final en tiempo real.",
    defaultOpen: true,
    blocks: [
      {
        type: "formula",
        result: "Precio final",
        expression:
          "(Costo + Ganancia + Publicidad + Otros) + IVA + Comisión",
      },
      {
        type: "paragraph",
        html: 'Para calcular el precio de venta, <strong>sumá al costo base</strong> tu porcentaje de ganancia, los costos de publicidad y otros gastos.',
      },
      {
        type: "paragraph",
        muted: true,
        html: 'Después aplicá el <em>IVA sobre el subtotal</em> y la <em>comisión bancaria</em> si vendés con tarjeta.',
      },
      {
        type: "callout",
        html: 'Con <span class="product-name">Lempira</span> hacés todo esto automáticamente: ingresás el costo y los porcentajes, y obtenés el precio final en tiempo real.',
      },
    ],
  },
  {
    question: "¿Cómo sacar el porcentaje de ganancia de un producto?",
    answer:
      "El margen de ganancia real se calcula dividiendo la ganancia por unidad entre el precio final y multiplicando por 100. La fórmula es: Margen real = (Ganancia por unidad ÷ Precio final) × 100. En Lempira, la ganancia por unidad representa la ganancia estimada por venta dentro del modelo de la calculadora. Los costos de publicidad y otros costos ya se suman al precio final para recuperarlos, por eso no se restan nuevamente de esta cifra. Si querés una utilidad neta completa del negocio, también tenés que considerar alquiler, salarios, impuestos y otros gastos generales fuera de esta herramienta.",
    blocks: [
      {
        type: "formula",
        result: "Margen real",
        expression: "(Ganancia por unidad ÷ Precio final) × 100",
      },
      {
        type: "paragraph",
        html: 'El margen de ganancia real se calcula <strong>dividiendo la ganancia por unidad entre el precio final</strong> y multiplicando por 100.',
      },
      {
        type: "paragraph",
        muted: true,
        html: 'En <em>Lempira</em>, la ganancia por unidad representa la ganancia estimada por venta dentro del modelo de la calculadora. La publicidad y otros costos ya se suman al precio final para recuperarlos, por eso no se restan nuevamente. Para una utilidad neta completa del negocio, también tenés que considerar alquiler, salarios, impuestos y otros gastos generales.',
      },
      {
        type: "callout",
        html: '<span class="product-name">Lempira</span> te muestra el margen real según los costos y porcentajes que cargaste, con un indicador de salud para saber si tu precio es sostenible.',
      },
    ],
  },
  {
    question: "¿Cómo calcular el precio mayorista de un producto?",
    answer:
      "El precio mayorista se calcula aplicando un descuento sobre el subtotal antes de impuestos. Lo común es entre 20% y 40% según el volumen de compra. Después se aplican IVA y comisión bancaria sobre el precio con descuento. La fórmula es: Precio mayorista = Subtotal − Descuento + IVA + Comisión. Lempira muestra el precio mayorista junto al precio al detalle para comparar en tiempo real.",
    blocks: [
      {
        type: "formula",
        result: "Precio mayorista",
        expression: "Subtotal − Descuento + IVA + Comisión",
      },
      {
        type: "paragraph",
        html: 'El precio mayorista se calcula aplicando un <strong>descuento sobre el subtotal antes de impuestos</strong>. Lo común es entre 20% y 40% según el volumen de compra.',
      },
      {
        type: "paragraph",
        muted: true,
        html: 'Después se aplican el IVA y la comisión bancaria sobre el precio con descuento. Es clave revisar que el <em>margen siga siendo positivo</em>, porque un descuento muy agresivo puede hacer que pierdas dinero en cada venta.',
      },
      {
        type: "callout",
        html: '<span class="product-name">Lempira</span> muestra el precio mayorista junto al precio al detalle para que compares en tiempo real y verifiques que ambos tengan margen saludable.',
      },
    ],
  },
  {
    question: "¿Cuánto IVA se cobra en Honduras?",
    answer:
      "En Honduras el Impuesto Sobre Ventas (ISV) tiene tres niveles según el tipo de producto o servicio: 15% para la mayoría de productos y servicios, 18% para turismo, hoteles, bebidas alcohólicas y tabaco, y 0% para productos exentos como medicinas, alimentos básicos y libros. Lempira ya viene configurada con el 15% por defecto, pero podés ajustar la tasa según tu producto.",
    blocks: [
      {
        type: "stats",
        items: [
          {
            label: "General",
            value: "15%",
            description: "Mayoría de productos y servicios",
          },
          {
            label: "Turismo y alcohol",
            value: "18%",
            description: "Hoteles, bebidas alcohólicas, tabaco",
          },
          {
            label: "Exentos",
            value: "0%",
            description: "Medicinas, alimentos básicos, libros",
          },
        ],
      },
      {
        type: "paragraph",
        html: 'En Honduras el <strong>Impuesto Sobre Ventas (ISV)</strong> tiene tres niveles según el tipo de producto o servicio.',
      },
      {
        type: "paragraph",
        muted: true,
        html: 'Si tu negocio <em>factura más de L 250,000 anuales</em>, estás obligado a cobrar ISV y trasladarlo al fisco. Consultá con tu contador si aplicás a algún régimen especial como artesanos o productores agrícolas.',
      },
      {
        type: "callout",
        html: '<span class="product-name">Lempira</span> ya viene con el 15% por defecto, pero podés ajustarlo al 18% o 0% según tu producto.',
      },
    ],
  },
  {
    question: "¿Cómo fijar precios si vendo con tarjeta de crédito o débito?",
    answer:
      "Los bancos cobran una comisión de entre 3% y 5% por cada transacción con tarjeta. Si no la incluís en tu precio, esa comisión sale directamente de tu ganancia. BAC, Banco Atlántida y Ficohsa manejan comisiones típicas de 3.5% a 4%. Las tarjetas de crédito suelen tener fee más alto que las de débito. Si tu volumen es alto, podés negociar un fee más bajo con el banco. Lempira calcula el precio final incluyendo la comisión bancaria desde el inicio.",
    blocks: [
      {
        type: "paragraph",
        html: 'Los bancos cobran una <strong>comisión de entre 3% y 5%</strong> por cada transacción con tarjeta. Si no la incluís en tu precio, esa comisión sale directamente de tu ganancia.',
      },
      {
        type: "bullets",
        items: [
          "BAC, Banco Atlántida y Ficohsa manejan comisiones típicas de <strong>3.5% a 4%</strong>",
          "Las tarjetas de crédito suelen tener fee más alto que las de débito",
          "Si tu volumen de ventas es alto, podés negociar un fee más bajo con el banco",
        ],
      },
      {
        type: "paragraph",
        muted: true,
        html: 'La mejor práctica es calcular el precio final <em>incluyendo la comisión bancaria</em> desde el inicio. Así el precio que mostrás es el precio real que recibís.',
      },
      {
        type: "callout",
        html: '<span class="product-name">Lempira</span> te permite configurar el fee bancario exacto de tu banco y lo aplica automáticamente en cada cálculo.',
      },
    ],
  },
  {
    question: "¿Cómo ponerle precio a un producto casero o artesanal?",
    answer:
      "El error más común con productos artesanales es olvidar cobrar tu tiempo. Si hacés jabones, joyería o comida, tu hora de trabajo tiene valor económico. El costo real incluye materiales, mano de obra, empaque y gastos fijos. Calculá cuánto querés ganar por hora, multiplicá por las horas que tardás en cada unidad, y sumalo al costo de materiales. Después aplicá tu porcentaje de ganancia sobre ese costo total. También prorratea gastos como luz, agua, internet, alquiler y transporte.",
    blocks: [
      {
        type: "formula",
        label: "Cálculo del costo real",
        result: "Costo real",
        expression: "Materiales + Mano de obra + Empaque + Gastos fijos",
      },
      {
        type: "paragraph",
        html: 'El error más común con productos artesanales es <strong>olvidar cobrar tu tiempo</strong>. Si hacés jabones, joyería o comida, tu hora de trabajo tiene valor económico.',
      },
      {
        type: "paragraph",
        muted: true,
        html: 'Calculá cuánto querés ganar por hora (mínimo <em>L 100 por hora</em> como referencia), multiplicá por las horas que tardás en cada unidad, y sumalo al costo de materiales. Después aplicá tu <em>porcentaje de ganancia sobre ese costo total</em>.',
      },
      {
        type: "paragraph",
        muted: true,
        html: 'Tampoco olvides prorratear gastos como luz, agua, internet, alquiler de espacio y transporte. Si producís 100 unidades al mes y tus gastos fijos son L 3,000, cada unidad carga L 30 de gastos fijos.',
      },
      {
        type: "callout",
        html: 'En <span class="product-name">Lempira</span> ingresás el costo real ya calculado y ajustás cada porcentaje hasta encontrar tu precio justo.',
      },
    ],
  },
  {
    question: "¿Qué margen de ganancia es recomendable para un negocio?",
    answer:
      "El margen recomendable varía según el rubro. Productos artesanales y servicios profesionales pueden tener márgenes del 40% al 60%. Retail de productos masivos suele estar entre 15% y 25%. Como referencia: un margen real del 20% o más es excelente, entre 10% y 20% es saludable, entre 5% y 10% es aceptable, y menos de 5% es marginal. Lo importante no es solo el porcentaje sino el volumen de ventas.",
    blocks: [
      {
        type: "stats",
        items: [
          {
            label: "Excelente",
            value: "20%+",
            description: "Saludable y escalable",
          },
          {
            label: "Saludable",
            value: "10–20%",
            description: "Rango normal en comercio",
          },
          {
            label: "Aceptable",
            value: "5–10%",
            description: "Revisá costos y eficiencia",
          },
          {
            label: "Marginal",
            value: "0–5%",
            description: "Riesgo alto, necesita ajuste",
          },
        ],
      },
      {
        type: "paragraph",
        html: 'El margen recomendable <strong>varía según el rubro</strong>. Productos artesanales y servicios profesionales pueden tener márgenes del 40% al 60%. Retail de productos masivos suele estar entre 15% y 25%.',
      },
      {
        type: "paragraph",
        muted: true,
        html: 'Lo importante no es solo el porcentaje sino el <em>volumen</em>. Un margen del 10% con 1,000 ventas al mes es mejor que un 50% con solo 20 ventas. Calculá tu punto de equilibrio: cuántas unidades necesitás vender para cubrir todos tus gastos fijos antes de ganar.',
      },
      {
        type: "callout",
        html: '<span class="product-name">Lempira</span> te muestra el margen real con un indicador visual de salud para saber si tu precio es sostenible o si necesitás ajustar.',
      },
    ],
  },
  {
    question: "¿Cuál es la fórmula del precio de venta?",
    answer:
      "La fórmula simplificada que se usa en contabilidad básica es: Precio venta = Costo × (1 + margen) × (1 + IVA). Multiplicás el costo por uno más tu margen deseado, y luego aplicás el IVA. En la realidad hay más factores: publicidad, comisiones bancarias, otros costos operativos y posibles descuentos mayoristas. Por eso la fórmula real es más compleja. Lempira aplica la fórmula completa con todas las variables del mercado hondureño.",
    blocks: [
      {
        type: "formula",
        label: "Fórmula simplificada",
        result: "Precio venta",
        expression: "Costo × (1 + margen) × (1 + IVA)",
      },
      {
        type: "paragraph",
        html: 'Esta es la <strong>fórmula simplificada</strong> que se usa en contabilidad básica. Multiplicás el costo por uno más tu margen deseado, y luego aplicás el IVA.',
      },
      {
        type: "paragraph",
        muted: true,
        html: 'Pero en la realidad hay más factores: publicidad, comisiones bancarias, otros costos operativos, y posibles descuentos mayoristas. Por eso la <em>fórmula real es más compleja</em> y es mejor usar una calculadora que los tome todos en cuenta.',
      },
      {
        type: "callout",
        html: '<span class="product-name">Lempira</span> aplica la fórmula completa con todas las variables relevantes para el mercado hondureño, sin que tengas que recordar la matemática.',
      },
    ],
  },
];
