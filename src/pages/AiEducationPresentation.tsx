import { PresentationPlayer } from '../components/presentation/PresentationPlayer';

export function AiEducationPresentation() {
  const aiVideoSlides = [
    { 
      id: "ai-1", 
      type: "cover", 
      title: "¿Vale la pena estudiar en la era de ChatGPT?", 
      subtitle: "Nuestro Análisis sobre la IA en la Educación", 
      notes: "" 
    },
    { 
      id: "ai-2", 
      type: "text", 
      title: "Introducción a nuestro Análisis", 
      content: "En esta presentación analizamos cómo la Inteligencia Artificial transforma radicalmente el propósito del aprendizaje, la actual crisis de la evaluación y el riesgo de caer en el 'sedentarismo cognitivo'.", 
      notes: "" 
    },
    { 
      id: "ai-3", 
      type: "callout", 
      calloutType: "warning", 
      title: "La crisis de la evaluación", 
      content: "Observamos que la IA ha roto la correlación histórica entre aprobar y aprender. Hoy podemos usar ChatGPT para 'sacarnos un 20' sin comprender realmente el tema, lo que desconecta por completo las notas del conocimiento verdadero.", 
      notes: "" 
    },
    { 
      id: "ai-3b", 
      type: "callout", 
      calloutType: "warning", 
      title: "La evolución del plagio", 
      content: "Hemos visto cómo el plagio evolucionó rápidamente: antes utilizábamos 'las hojitas' o copiábamos de libros físicos; luego llegó Google para facilitarnos el 'copiar y pegar'. Ahora, con ChatGPT, la máquina genera todo el contenido por nosotros desde cero, eliminando cualquier tipo de fricción.", 
      notes: "" 
    },
    { 
      id: "ai-3c", 
      type: "text", 
      title: "Edison y el valor del error", 
      content: "Recordemos a Thomas Edison al inventar el foco: él no vio sus miles de intentos fallidos como fracasos, sino como 'formas en las que no funciona un foco'. Notamos la gran ironía de que, en nuestro sistema educativo actual, equivocarse tantas veces significaría reprobar con un cero, castigando el error en lugar de valorarlo como parte del proceso de aprendizaje.", 
      notes: "" 
    },
    { 
      id: "ai-4", 
      type: "callout", 
      calloutType: "info", 
      title: "Sedentarismo cognitivo", 
      content: "Si delegamos excesivamente nuestras tareas intelectuales a la máquina, corremos el riesgo de atrofiar nuestra capacidad de pensar y analizar. Si la IA 'piensa' por nosotros en todo momento, nuestra mente se debilita, igual que lo hace el cuerpo sin ejercicio.", 
      notes: "" 
    },
    { 
      id: "ai-4_stats", 
      type: "callout", 
      calloutType: "warning", 
      title: "Evidencia del deterioro cognitivo", 
      content: "Existen estudios (como los realizados en importantes universidades) que dividieron a los estudiantes en tres grupos: los que resolvían problemas con su propio intelecto, los que usaban Google, y los que usaban IA generativa. Los resultados demostraron que los lóbulos frontales del cerebro no se desarrollaban igual en quienes usaban IA frente a los que hacían el esfuerzo mental por sí mismos.", 
      notes: "" 
    },
    { 
      id: "ai-4b", 
      type: "text", 
      title: "La analogía del Gimnasio", 
      content: "Imaginemos ir al gimnasio y contratar a otra persona para que levante las pesas y haga los ejercicios por nosotros. Al final del día, la otra persona se volverá fuerte, pero nosotros seguiremos escuálidos. De la misma manera funciona nuestro cerebro si dejamos que la IA haga todo el esfuerzo intelectual.", 
      notes: "" 
    },
    { 
      id: "ai-4c", 
      type: "text", 
      title: "Comer tu plato favorito", 
      content: "¿Dejarías que la Inteligencia Artificial se coma tu plato favorito mientras tú te quedas mirando sin disfrutarlo? Al delegar todo nuestro aprendizaje, nos estamos perdiendo el verdadero disfrute y la satisfacción que proviene de resolver un problema y aprender algo nuevo por nuestra cuenta.", 
      notes: "" 
    },
    { 
      id: "ai-5", 
      type: "callout", 
      calloutType: "tip", 
      title: "Motivación Intrínsica", 
      content: "Frente a herramientas que resuelven los retos sin esfuerzo, consideramos que la presión externa (castigos o premios) ya no funciona. El foco de nuestra educación debe trasladarse a despertar la curiosidad y fomentar nuestro deseo genuino de aprender.", 
      notes: "" 
    },
    { 
      id: "ai-6", 
      type: "callout", 
      calloutType: "info", 
      title: "La analogía del automóvil", 
      content: "Pensamos en la IA como un coche: podemos usarlo para llegar mucho más lejos (potenciando nuestras capacidades), o podemos usarlo para ir a la esquina y dejar de caminar, perdiendo en el proceso nuestra propia fuerza e independencia intelectual.", 
      notes: "" 
    },
    { 
      id: "ai-6b", 
      type: "interactive-list", 
      title: "¿Cómo sacamos verdadero provecho de la IA?", 
      items: [
        "Intentarlo nosotros primero: Es fundamental enfrentarnos al problema y tratar de resolverlo por nuestra cuenta antes de pedirle la respuesta a la IA.",
        "Usarla como tutor, no como atajo: Podemos pedirle a ChatGPT que nos explique un concepto que no entendemos, en lugar de pedirle que haga la tarea completa.",
        "Desarrollar criterio crítico: Debemos evaluar y cuestionar lo que la IA nos devuelve, ya que no siempre tiene la razón absoluta.",
        "Automatizar lo tedioso, no el aprendizaje: Usemos la IA para tareas repetitivas, pero reservemos el esfuerzo intelectual donde realmente haya crecimiento personal."
      ],
      notes: "" 
    },
    { 
      id: "ai-7", 
      type: "text", 
      title: "Conclusión", 
      content: "Creemos firmemente que el verdadero desafío es utilizar la Inteligencia Artificial como un copiloto que eleve nuestras propias capacidades, y no como un sustituto que apague nuestro pensamiento crítico y estanque nuestro desarrollo personal.", 
      notes: "" 
    },
    { 
      id: "ai-8", 
      type: "closing", 
      title: "Fin de nuestro Análisis", 
      subtitle: "¿Tienes alguna duda o consulta sobre estos puntos?", 
      notes: "" 
    }
  ];

  return (
    <PresentationPlayer 
      slides={aiVideoSlides} 
      courseCode="IA-EDU" 
      contextTitle="Análisis de Video" 
    />
  );
}
