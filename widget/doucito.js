(function () {
  "use strict";

  var DOU = {
    orange: "#FF5400",
    magenta: "#FF00FF",
    turquoise: "#00B5AF",
    purple: "#5C0190",
    black: "#1A1A1A",
    white: "#FFFFFF",
    lightBg: "#FFF5EE",
    botBubble: "#E6F9F8",
    userBubble: "#FF5400",
  };

  var AVATAR_SVG =
    '<svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">' +
    '<circle cx="24" cy="24" r="22" fill="' + DOU.turquoise + '" stroke="' + DOU.black + '" stroke-width="2.5"/>' +
    '<circle cx="17" cy="20" r="6" fill="' + DOU.white + '" stroke="' + DOU.black + '" stroke-width="1.5"/>' +
    '<circle cx="31" cy="20" r="6" fill="' + DOU.white + '" stroke="' + DOU.black + '" stroke-width="1.5"/>' +
    '<circle cx="18.5" cy="20.5" r="3" fill="' + DOU.black + '"/>' +
    '<circle cx="32.5" cy="20.5" r="3" fill="' + DOU.black + '"/>' +
    '<circle cx="19.5" cy="19" r="1" fill="' + DOU.white + '"/>' +
    '<circle cx="33.5" cy="19" r="1" fill="' + DOU.white + '"/>' +
    '<path d="M16 32 Q24 38 32 32" stroke="' + DOU.black + '" stroke-width="2" fill="none" stroke-linecap="round"/>' +
    "</svg>";

  var QUICK_REPLIES_INITIAL = [
    { label: "Nuestros alfajores", value: "productos" },
    { label: "Envios", value: "envios" },
    { label: "Como pago?", value: "pago" },
    { label: "Donde los compro?", value: "donde compro" },
  ];

  var responses = [
    {
      keywords: [/^hola$/i, /buenas/i, /^hey$/i, /que\s*onda/i, /^holi/i, /^hi$/i, /^buenos/i, /^buen\s*d/i, /^buenas\s*tarde/i, /^buenas\s*noche/i, /^que\s*tal/i, /^wena/i],
      replies: [
        "Holaaa! Soy Doucito, tu asistente de DOU Foods. En que te puedo ayudar?",
        "Que onda! Soy Doucito. Preguntame lo que necesites sobre DOU!",
        "Buenasss! Aca Doucito para ayudarte. Que necesitas?",
      ],
      quickReplies: QUICK_REPLIES_INITIAL,
    },
    {
      keywords: [/producto/i, /alfajor/i, /que\s*(tienen|venden|hay)/i, /catalogo/i, /sabor/i, /variedad/i, /opcio/i, /menu/i],
      replies: [
        "Tenemos 3 alfajores que son una locura:\n\n" +
          "🟠 DOU NOM - Alfajor con chips de chocolate, dulce de leche y cobertura de chocolate semiamargo. El clasico que rompe todo.\n\n" +
          "🔵 DOU XD - Cookie de chocolate crocante, dulce de leche y bano de chocolate blanco cremoso.\n\n" +
          "🟣 DOU NT - Relleno cremoso de avellanas con bano de chocolate con leche.\n\n" +
          "Tambien tenemos el DOU MIX: una caja con los 3 sabores!",
      ],
      quickReplies: [
        { label: "Quiero comprar!", value: "donde compro" },
        { label: "Precios", value: "precio" },
        { label: "DOU MIX", value: "dou mix" },
      ],
    },
    {
      keywords: [/\bnom\b/i, /negro/i, /semiamargo/i, /chips.*chocolate/i, /clasico/i],
      replies: [
        "DOU NOM es EL alfajor. Galleta con chips de chocolate que se desarma en tu boca, un rio de dulce de leche cremoso y bano de chocolate semiamargo que cruje en cada mordida. Es adictivo, te aviso.",
      ],
      quickReplies: [
        { label: "Ver todos los sabores", value: "productos" },
        { label: "Donde lo compro?", value: "donde compro" },
      ],
    },
    {
      keywords: [/\bxd\b/i, /blanco/i, /chocolate\s*blanco/i],
      replies: [
        "DOU XD es para los fans del chocolate blanco. Cookie de chocolate bien crocante, corazon generoso de dulce de leche y bano de chocolate blanco super cremoso. Una bomba.",
      ],
      quickReplies: [
        { label: "Ver todos los sabores", value: "productos" },
        { label: "Donde lo compro?", value: "donde compro" },
      ],
    },
    {
      keywords: [/\bnt\b/i, /avellana/i, /hazelnut/i],
      replies: [
        "DOU NT es el de avellanas. Relleno cremoso de avellanas que se desborda con bano de chocolate con leche. Si te gusta la Nutella, esto es tu nuevo vicio.",
      ],
      quickReplies: [
        { label: "Ver todos los sabores", value: "productos" },
        { label: "Donde lo compro?", value: "donde compro" },
      ],
    },
    {
      keywords: [/mix/i, /caja/i, /combo/i, /pack/i, /surtido/i, /todos.*sabor/i],
      replies: [
        "El DOU MIX trae 12 alfajores: 4 NOM + 4 XD + 4 NT. Todos los sabores en una sola caja. Ideal para probar los 3 y elegir tu team!",
      ],
      quickReplies: [
        { label: "Quiero comprarlo!", value: "donde compro" },
        { label: "Precio", value: "precio" },
      ],
    },
    {
      keywords: [/env[ií]o/i, /mand[aá]n/i, /despacho/i, /lleg[aá]/i, /env[ií][aá]n/i, /shipping/i, /recib/i],
      replies: [
        "Hacemos envios a TODO el pais! Y ojo: envio GRATIS en compras desde $40.000. Lo mandamos por correo y tarda entre 3-7 dias habiles dependiendo de tu ubicacion.",
      ],
      quickReplies: [
        { label: "Cuando llega?", value: "cuando llega" },
        { label: "Ir a la tienda", value: "tienda online" },
      ],
    },
    {
      keywords: [/provincia/i, /interior/i, /llegan?\s*a\b/i, /env[ií]an?\s*a\b/i, /mandan?\s*a\b/i, /cobertura/i],
      replies: [
        "Si! Enviamos a TODAS las provincias de Argentina. No importa donde estes, el DOU te llega. Envio gratis en compras desde $40.000!",
      ],
      quickReplies: [
        { label: "Cuanto tarda?", value: "cuando llega" },
        { label: "Como pago?", value: "pago" },
      ],
    },
    {
      keywords: [/cu[aá]n(do|to)\s*(llega|tarda|demora)/i, /tiempo.*entrega/i, /demora/i, /plazo/i, /dias.*habiles/i],
      replies: [
        "Tu pedido tarda entre 3 y 7 dias habiles en llegar, dependiendo de tu ubicacion. Cuando lo despachemos te va a llegar un mail con el numero de seguimiento para rastrearlo!",
      ],
      quickReplies: [
        { label: "Ir a la tienda", value: "tienda online" },
        { label: "Contactar soporte", value: "contacto" },
      ],
    },
    {
      keywords: [/seguimiento/i, /rastrear/i, /tracking/i, /n[uú]mero.*pedido/i, /estado.*pedido/i, /mi\s*pedido/i, /donde\s*esta\s*mi/i],
      replies: [
        "Segui tu pedido aca: doufoods.com.ar/seguimiento",
      ],
      quickReplies: [
        { label: "Contactar soporte", value: "contacto" },
      ],
    },
    {
      keywords: [/pag[oa]/i, /tarjeta/i, /mercado\s*pago/i, /c[oó]mo\s*pag/i, /medio.*pago/i, /d[eé]bito/i, /cr[eé]dito/i, /transferencia/i, /efectivo/i],
      replies: [
        "Pagas de forma segura a traves de Mercado Pago. Podes usar:\n\n" +
          "- Tarjeta de credito (hasta en cuotas!)\n" +
          "- Tarjeta de debito\n" +
          "- Dinero en tu cuenta de Mercado Pago\n\n" +
          "Todo 100% seguro!",
      ],
      quickReplies: [
        { label: "Ir a la tienda", value: "tienda online" },
        { label: "Envios", value: "envios" },
      ],
    },
    {
      keywords: [/tacc/i, /cel[ií]ac/i, /gluten/i, /apto/i, /sin\s*tacc/i, /alerg/i, /intoleran/i],
      replies: [
        "Por ahora nuestros alfajores NO son aptos para celiacos (contienen gluten/TACC). Sabemos que es importante y lo tenemos en cuenta para futuros productos!",
      ],
      quickReplies: [
        { label: "Ver productos", value: "productos" },
        { label: "Contactar soporte", value: "contacto" },
      ],
    },
    {
      keywords: [/vegano/i, /vegetariano/i, /sin\s*lactosa/i, /lactosa/i],
      replies: [
        "Nuestros alfajores contienen lacteos (dulce de leche y chocolate), asi que no son aptos para veganos ni para intolerantes a la lactosa. Lo sentimos!",
      ],
      quickReplies: [
        { label: "Ver productos", value: "productos" },
      ],
    },
    {
      keywords: [/d[oó]nde\s*(compro|consigo|encuentro|los\s*venden)/i, /punto.*venta/i, /kiosco/i, /supermercado/i, /distri/i, /comprar/i, /conseguir/i, /venden/i],
      replies: [
        "Podes comprar DOU de dos formas:\n\n" +
          "🛒 ONLINE: En nuestra tienda doufoods.com.ar/tienda con envio a todo el pais.\n\n" +
          "🏪 FISICO: En kioscos, distribuidores y supermercados de todo el pais. En la web tenes un mapa con todos los puntos de venta cerca tuyo!",
      ],
      quickReplies: [
        { label: "Ir a la tienda online", value: "tienda online" },
        { label: "Envios", value: "envios" },
      ],
    },
    {
      keywords: [/tienda\s*online/i, /web/i, /p[aá]gina/i, /link.*tienda/i, /link.*compra/i],
      replies: [
        "Entra a nuestra tienda online y pedi tus DOU:\n\n👉 doufoods.com.ar/tienda\n\nAhi encontras todos los productos, precios actualizados y envio a todo el pais!",
      ],
      quickReplies: [
        { label: "Como pago?", value: "pago" },
        { label: "Envios", value: "envios" },
      ],
    },
    {
      keywords: [/precio/i, /cu[aá]nto\s*(cuesta|sale|vale)/i, /valor/i, /\$/i],
      replies: [
        "Los precios estan actualizados en nuestra tienda online. Entra a doufoods.com.ar/tienda para ver los precios de cada producto y las promos disponibles!",
      ],
      quickReplies: [
        { label: "Ir a la tienda", value: "tienda online" },
        { label: "Ver productos", value: "productos" },
      ],
    },
    {
      keywords: [/dou\s*gang/i, /gang/i, /punto[s]?\b/i, /comunidad/i, /sumo\s*punto/i, /c[oó]mo\s*sumo/i, /programa/i, /beneficio/i, /reward/i, /coin/i, /canjear/i, /canje/i],
      replies: [
        "Compras DOU, juntas DOU coins y las canjeas por lo que quieras: stickers, gorra, remera, una caja gratis o un saludo de Benja. Sin tarjetas, sin vueltas: tu mail es tu cuenta.\n\n" +
          "Como funciona?\n" +
          "📧 Sumate: Pones tu mail y ya sos parte. Te regalamos las primeras coins.\n" +
          "🛒 Compra online: 1 coin por cada $100. Una caja x12 son 168 coins.\n" +
          "🎂 Tu cumple: El dia que cumplis te caen coins de regalo, compres o no.\n" +
          "👥 Trae un amigo: Tu amigo se lleva 10% off y vos sumas 300 coins.\n\n" +
          "Que podes canjear?\n" +
          "🗒 Pack de stickers — 300 coins\n" +
          "🪙 Llavero DOU Coin — 600 coins\n" +
          "🧢 Gorra DOU — 1.500 coins\n" +
          "📦 Una caja de cada sabor — 2.200 coins\n" +
          "👕 Remera DOU GANG — 3.000 coins\n" +
          "🧢👕 Gorra + Remera — 4.000 coins\n" +
          "🎥 Saludo de Benja — 6.000 coins",
      ],
      quickReplies: [
        { label: "Saludo de Benja", value: "saludo de benja" },
        { label: "Ir a la tienda", value: "tienda online" },
      ],
    },
    {
      keywords: [/saludo/i, /video\s*de\s*benja/i, /saludo\s*de\s*benja/i],
      replies: [
        "Benja te graba un video saludandote con tu nombre. Para vos o para regalar. Unite a la DOU GANG y junta 6.000 coins.",
      ],
      quickReplies: [
        { label: "DOU GANG", value: "dou gang" },
        { label: "Ir a la tienda", value: "tienda online" },
      ],
    },
    {
      keywords: [/contacto/i, /whatsapp/i, /wsp/i, /hablar.*persona/i, /hablar.*humano/i, /soporte/i, /mail/i, /email/i, /ayuda/i, /reclamo/i, /queja/i, /problema/i],
      replies: [
        "Podes contactarnos por estos medios:\n\n" +
          "📱 WhatsApp: Escribinos desde la web (boton de WhatsApp)\n" +
          "📧 Mail: Encontralo en la seccion de contacto de doufoods.com.ar\n" +
          "📸 Instagram: @doufoods\n\n" +
          "Te respondemos lo mas rapido posible!",
      ],
    },
    {
      keywords: [/instagram/i, /red(es)?\s*social/i, /tiktok/i, /twitter/i, /youtube/i, /seguir/i, /ig\b/i],
      replies: [
        "Seguinos en Instagram como @doufoods! Ahi subimos contenido, promos, sorteos y todo lo nuevo de DOU. Unite a la DOU GANG!",
      ],
    },
    {
      keywords: [/qui[eé]n(es)?\s*(son|es)/i, /sobre\s*dou/i, /historia/i, /creador/i, /benja/i, /fundador/i, /marca/i, /empresa/i],
      replies: [
        "Benja Calero es un youtuber y creador de contenido argentino enfocado en un publico joven. 'Arranque grabando videos en mi cuarto. Hoy tengo en la mano el mejor alfajor del planeta — y esto recien empieza. Sumate a la DOU GANG: no vinimos a competir, vinimos a ser la marca #1 del mundo. 🏆🔥'",
      ],
      quickReplies: [
        { label: "Ver los alfajores", value: "productos" },
      ],
    },
    {
      keywords: [/ingrediente/i, /de\s*qu[eé]\s*(est[aá]|tiene)/i, /composici[oó]n/i, /informaci[oó]n\s*nutricional/i, /nutricional/i, /calor[ií]a/i],
      replies: [
        "La info nutricional completa la encontras en el packaging de cada alfajor. Los ingredientes principales son: harina de trigo, dulce de leche, chocolate (semiamargo, blanco o con leche segun el sabor), manteca y azucar. Para mas detalle, revisa el envase!",
      ],
    },
    {
      keywords: [/mayorista/i, /revend/i, /distribuir/i, /por\s*mayor/i, /quiero\s*vender/i],
      replies: [
        "Te interesa vender DOU en tu negocio? Genial! Escribinos por mail o WhatsApp desde la seccion de contacto de doufoods.com.ar y te pasamos toda la info para distribuidores.",
      ],
      quickReplies: [
        { label: "Contactar", value: "contacto" },
      ],
    },
    {
      keywords: [/devolu/i, /cambio/i, /reembolso/i, /llego\s*mal/i, /roto/i, /danado/i, /vencido/i],
      replies: [
        "Si tu pedido llego en mal estado o tenes algun inconveniente, escribinos rapido por WhatsApp o mail con fotos del producto y te lo solucionamos. Tu experiencia nos importa!",
      ],
      quickReplies: [
        { label: "Contactar soporte", value: "contacto" },
      ],
    },
    {
      keywords: [/merch/i, /remera/i, /gorra/i, /buzo/i, /hoodie/i, /ropa/i, /merchandising/i, /funda/i, /medias/i, /sticker/i],
      replies: [
        "Tenemos merch de DOU! Remeras, buzos, gorras, medias, fundas de celular y mas. Todo con la onda de la DOU GANG. Revisa la tienda online para ver que hay disponible!",
      ],
      quickReplies: [
        { label: "Ir a la tienda", value: "tienda online" },
      ],
    },
    {
      keywords: [/gracia/i, /genial/i, /graxx/i, /thx/i, /thank/i, /piola/i, /copado/i, /excelente/i, /perfecto/i, /crack/i, /capo/i, /geni[oa]/i, /barbaro/i, /joya/i],
      replies: [
        "De nada! Si necesitas algo mas, aca estoy. Que disfrutes tu DOU! 🔥",
        "Para eso estoy! Cualquier cosa me preguntas de nuevo.",
        "Joya! Si se te ocurre algo mas, aca me tenes.",
      ],
    },
    {
      keywords: [/chau/i, /adi[oó]s/i, /nos\s*vemos/i, /bye/i, /hasta\s*luego/i, /me\s*voy/i],
      replies: [
        "Chauuu! Que la pases bien. Acordate de comerte un DOU 🧡",
        "Nos vemos! Cualquier duda, volve cuando quieras. DOU GANG forever!",
        "Hasta la proxima! Y si no probaste los 3 sabores, que estas esperando? 😏",
      ],
    },
    {
      keywords: [/te\s*amo/i, /te\s*quiero/i, /sos\s*(lo|el)\s*mejor/i, /me\s*encantas/i, /sos\s*un\s*genio/i],
      replies: [
        "Awww, yo tambien te quiero! Bueno... yo quiero a toda la DOU GANG 🧡",
        "Me haces sonrojar (si, los chatbots nos sonrojamos). Gracias!",
      ],
    },
    {
      keywords: [/jaj/i, /haha/i, /lol/i, /xd$/i, /jiji/i, /🤣/i, /😂/i],
      replies: [
        "Jajaj me alegra que te diviertas! Necesitas algo mas?",
        "XD literal (como nuestro alfajor de chocolate blanco 😏). Te ayudo en algo mas?",
      ],
      quickReplies: QUICK_REPLIES_INITIAL,
    },
    {
      keywords: [/mejor\s*alfajor/i, /el\s*mejor/i, /numero\s*1/i, /n[uú]mero\s*uno/i],
      replies: [
        "OBVIAMENTE somos el mejor alfajor del mundo. No lo digo yo, lo dice toda la DOU GANG. Ya los probaste?",
      ],
      quickReplies: [
        { label: "Ver los alfajores", value: "productos" },
        { label: "Donde los compro?", value: "donde compro" },
      ],
    },
  ];

  var FALLBACK_REPLIES = [
    "Uh, no te entendi bien. Proba preguntarme sobre nuestros alfajores, envios, medios de pago o puntos de venta!",
    "Mm, no capto esa. Puedo ayudarte con info de productos, envios, pagos o donde conseguir DOU. Que necesitas?",
    "No estoy seguro de que me preguntas. Proba con alguna de estas opciones!",
  ];

  var WELCOME_MESSAGE =
    "Holaaa! Soy Doucito 👋 Tu asistente de DOU Foods.\n\nPreguntame lo que necesites: productos, envios, pagos, donde comprar... lo que sea!";

  function injectStyles() {
    var css = [
      "#doucito-widget *{box-sizing:border-box;margin:0;padding:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;}",
      "#doucito-toggle{position:fixed;bottom:100px;right:20px;width:64px;height:64px;border-radius:50%;border:3px solid " + DOU.black + ";background:" + DOU.orange + ";cursor:pointer;z-index:99999;display:flex;align-items:center;justify-content:center;box-shadow:4px 4px 0 " + DOU.black + ";transition:transform .2s,box-shadow .2s;animation:doucito-pulse 2s infinite;}",
      "#doucito-toggle:hover{transform:translate(-2px,-2px);box-shadow:6px 6px 0 " + DOU.black + ";}",
      "#doucito-toggle:active{transform:translate(2px,2px);box-shadow:2px 2px 0 " + DOU.black + ";}",
      "#doucito-toggle svg{width:40px;height:40px;}",
      "#doucito-toggle .doucito-close{display:none;font-size:28px;color:" + DOU.white + ";font-weight:bold;line-height:1;}",
      "#doucito-toggle.open svg{display:none;}",
      "#doucito-toggle.open .doucito-close{display:block;}",
      "#doucito-toggle.open{animation:none;}",
      "@keyframes doucito-pulse{0%,100%{box-shadow:4px 4px 0 " + DOU.black + ";}50%{box-shadow:4px 4px 0 " + DOU.black + ",0 0 0 8px rgba(255,84,0,0.2);}}",

      "#doucito-window{position:fixed;bottom:175px;right:20px;width:380px;max-width:calc(100vw - 40px);height:520px;max-height:calc(100vh - 200px);border-radius:20px;border:3px solid " + DOU.black + ";background:" + DOU.white + ";z-index:99998;display:none;flex-direction:column;overflow:hidden;box-shadow:6px 6px 0 " + DOU.black + ";animation:doucito-slideUp .3s ease;}",
      "#doucito-window.open{display:flex;}",

      "@keyframes doucito-slideUp{from{opacity:0;transform:translateY(20px);}to{opacity:1;transform:translateY(0);}}",

      "#doucito-header{background:linear-gradient(135deg," + DOU.orange + " 0%," + DOU.magenta + " 100%);padding:16px 20px;display:flex;align-items:center;gap:12px;border-bottom:3px solid " + DOU.black + ";}",
      "#doucito-header-avatar{width:40px;height:40px;flex-shrink:0;}",
      "#doucito-header-info h3{color:" + DOU.white + ";font-size:16px;font-weight:800;text-shadow:1px 1px 0 " + DOU.black + ";}",
      "#doucito-header-info p{color:rgba(255,255,255,0.9);font-size:12px;font-weight:500;}",

      "#doucito-messages{flex:1;overflow-y:auto;padding:16px;display:flex;flex-direction:column;gap:12px;background:" + DOU.lightBg + ";}",
      "#doucito-messages::-webkit-scrollbar{width:6px;}",
      "#doucito-messages::-webkit-scrollbar-thumb{background:" + DOU.turquoise + ";border-radius:3px;}",

      ".doucito-msg{display:flex;gap:8px;max-width:88%;animation:doucito-fadeIn .3s ease;}",
      ".doucito-msg.bot{align-self:flex-start;}",
      ".doucito-msg.user{align-self:flex-end;flex-direction:row-reverse;}",

      "@keyframes doucito-fadeIn{0%{opacity:0;transform:translateY(10px) scale(0.95);}70%{transform:translateY(-3px) scale(1.02);}100%{opacity:1;transform:translateY(0) scale(1);}}",

      ".doucito-msg-avatar{width:28px;height:28px;flex-shrink:0;margin-top:4px;}",

      ".doucito-msg-bubble{padding:16px 20px;border-radius:16px;border:2px solid " + DOU.black + ";font-size:15px;line-height:1.8;white-space:pre-wrap;word-wrap:break-word;overflow:visible;}",
      ".doucito-msg.bot .doucito-msg-bubble{background:" + DOU.botBubble + ";color:" + DOU.black + ";border-bottom-left-radius:4px;}",
      ".doucito-msg.user .doucito-msg-bubble{background:" + DOU.userBubble + ";color:" + DOU.white + ";border-bottom-right-radius:4px;}",

      ".doucito-quick-replies{display:flex;flex-wrap:wrap;gap:8px;padding:4px 0 4px 36px;}",
      ".doucito-quick-btn{padding:10px 18px;border-radius:20px;border:2px solid " + DOU.turquoise + ";background:" + DOU.white + ";color:" + DOU.turquoise + ";font-size:14px;font-weight:600;cursor:pointer;transition:all .15s;opacity:0;animation:doucito-fadeIn .3s ease forwards;}",
      ".doucito-quick-btn:hover{background:" + DOU.turquoise + ";color:" + DOU.white + ";}",

      ".doucito-typing{display:flex;gap:8px;align-self:flex-start;max-width:85%;padding:4px 0;}",
      ".doucito-typing-dots{display:flex;align-items:center;gap:4px;padding:10px 16px;background:" + DOU.botBubble + ";border:2px solid " + DOU.black + ";border-radius:16px;border-bottom-left-radius:4px;}",
      ".doucito-typing-dot{width:7px;height:7px;border-radius:50%;background:" + DOU.turquoise + ";animation:doucito-bounce .6s infinite alternate;}",
      ".doucito-typing-dot:nth-child(2){animation-delay:.2s;}",
      ".doucito-typing-dot:nth-child(3){animation-delay:.4s;}",
      "@keyframes doucito-bounce{to{transform:translateY(-4px);opacity:0.5;}}",

      "#doucito-input-area{display:flex;align-items:center;gap:8px;padding:12px 16px;border-top:3px solid " + DOU.black + ";background:" + DOU.white + ";}",
      "#doucito-input{flex:1;padding:10px 14px;border-radius:24px;border:2px solid #ddd;font-size:14px;outline:none;transition:border-color .2s;}",
      "#doucito-input:focus{border-color:" + DOU.turquoise + ";}",
      "#doucito-input::placeholder{color:#aaa;}",
      "#doucito-send{width:40px;height:40px;border-radius:50%;border:2px solid " + DOU.black + ";background:" + DOU.orange + ";cursor:pointer;display:flex;align-items:center;justify-content:center;transition:transform .15s;flex-shrink:0;}",
      "#doucito-send:hover{transform:scale(1.08);}",
      "#doucito-send:active{transform:scale(0.95);}",
      "#doucito-send svg{width:18px;height:18px;}",

      "#doucito-powered{text-align:center;padding:6px;font-size:10px;color:#999;background:" + DOU.white + ";}",

      "@media(max-width:480px){" +
        "#doucito-window{bottom:0;right:0;width:100vw;max-width:100vw;height:100vh;max-height:100vh;border-radius:0;border:none;}" +
        "#doucito-toggle{bottom:20px;right:16px;}" +
      "}",
    ].join("\n");

    var style = document.createElement("style");
    style.id = "doucito-styles";
    style.textContent = css;
    document.head.appendChild(style);
  }

  function createDOM() {
    var widget = document.createElement("div");
    widget.id = "doucito-widget";
    widget.innerHTML =
      '<button id="doucito-toggle" aria-label="Abrir chat Doucito">' +
        AVATAR_SVG +
        '<span class="doucito-close">✕</span>' +
      "</button>" +
      '<div id="doucito-window">' +
        '<div id="doucito-header">' +
          '<div id="doucito-header-avatar">' + AVATAR_SVG + "</div>" +
          '<div id="doucito-header-info">' +
            "<h3>Doucito</h3>" +
            "<p>Asistente de DOU Foods</p>" +
          "</div>" +
        "</div>" +
        '<div id="doucito-messages"></div>' +
        '<div id="doucito-input-area">' +
          '<input id="doucito-input" type="text" placeholder="Escribi tu mensaje..." autocomplete="off"/>' +
          '<button id="doucito-send" aria-label="Enviar">' +
            '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">' +
              '<path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" fill="' + DOU.white + '"/>' +
            "</svg>" +
          "</button>" +
        "</div>" +
        '<div id="doucito-powered">DOU Foods &middot; El mejor alfajor del mundo</div>' +
      "</div>";

    document.body.appendChild(widget);
  }

  function getRandomItem(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  function normalize(text) {
    return text
      .normalize("NFD")
      .replace(/[̀-ͯ]/g, "")
      .replace(/[?!¿¡.,;:()]/g, "")
      .trim()
      .toLowerCase();
  }

  function findResponse(userInput) {
    var normalized = normalize(userInput);
    for (var i = 0; i < responses.length; i++) {
      var entry = responses[i];
      for (var j = 0; j < entry.keywords.length; j++) {
        if (entry.keywords[j].test(normalized) || entry.keywords[j].test(userInput.toLowerCase())) {
          return {
            text: getRandomItem(entry.replies),
            quickReplies: entry.quickReplies || null,
          };
        }
      }
    }
    return {
      text: getRandomItem(FALLBACK_REPLIES),
      quickReplies: QUICK_REPLIES_INITIAL,
    };
  }

  function scrollToBottom(container) {
    setTimeout(function () {
      container.scrollTop = container.scrollHeight;
    }, 50);
  }

  function addMessage(container, text, type) {
    var msg = document.createElement("div");
    msg.className = "doucito-msg " + type;

    var html = "";
    if (type === "bot") {
      html += '<div class="doucito-msg-avatar">' + AVATAR_SVG + "</div>";
    }
    html += '<div class="doucito-msg-bubble">' + escapeHtml(text) + "</div>";
    msg.innerHTML = html;
    container.appendChild(msg);
    scrollToBottom(container);
  }

  function escapeHtml(text) {
    var div = document.createElement("div");
    div.appendChild(document.createTextNode(text));
    var escaped = div.innerHTML;
    escaped = escaped.replace(/\n/g, "<br>");

    escaped = escaped.replace(
      /(doufoods\.com\.ar\/seguimiento|doufoods\.com\.ar\/tienda|doufoods\.com\.ar)/g,
      '<a href="https://$1" target="_blank" rel="noopener" style="color:' + DOU.turquoise + ';font-weight:600;text-decoration:underline;">$1</a>'
    );
    escaped = escaped.replace(
      /@doufoods/g,
      '<a href="https://www.instagram.com/doufoods/" target="_blank" rel="noopener" style="color:' + DOU.turquoise + ';font-weight:600;text-decoration:underline;">@doufoods</a>'
    );
    return escaped;
  }

  function addQuickReplies(container, quickReplies, handleSend) {
    if (!quickReplies || !quickReplies.length) return;
    var wrapper = document.createElement("div");
    wrapper.className = "doucito-quick-replies";
    for (var i = 0; i < quickReplies.length; i++) {
      (function (qr, idx) {
        var btn = document.createElement("button");
        btn.className = "doucito-quick-btn";
        btn.style.animationDelay = (idx * 80) + "ms";
        btn.textContent = qr.label;
        btn.addEventListener("click", function () {
          var allQR = container.querySelectorAll(".doucito-quick-replies");
          for (var k = 0; k < allQR.length; k++) {
            allQR[k].style.pointerEvents = "none";
            allQR[k].style.opacity = "0.5";
          }
          handleSend(qr.value);
        });
        wrapper.appendChild(btn);
      })(quickReplies[i], i);
    }
    container.appendChild(wrapper);
    scrollToBottom(container);
  }

  function showTyping(container) {
    var typing = document.createElement("div");
    typing.className = "doucito-typing";
    typing.id = "doucito-typing";
    typing.innerHTML =
      '<div class="doucito-msg-avatar">' + AVATAR_SVG + "</div>" +
      '<div class="doucito-typing-dots">' +
        '<div class="doucito-typing-dot"></div>' +
        '<div class="doucito-typing-dot"></div>' +
        '<div class="doucito-typing-dot"></div>' +
      "</div>";
    container.appendChild(typing);
    scrollToBottom(container);
  }

  function hideTyping() {
    var typing = document.getElementById("doucito-typing");
    if (typing) typing.remove();
  }

  function init() {
    injectStyles();
    createDOM();

    var toggle = document.getElementById("doucito-toggle");
    var chatWindow = document.getElementById("doucito-window");
    var messagesContainer = document.getElementById("doucito-messages");
    var input = document.getElementById("doucito-input");
    var sendBtn = document.getElementById("doucito-send");
    var welcomed = false;

    function toggleChat() {
      var isOpen = chatWindow.classList.toggle("open");
      toggle.classList.toggle("open", isOpen);
      if (isOpen && !welcomed) {
        welcomed = true;
        showTyping(messagesContainer);
        setTimeout(function () {
          hideTyping();
          addMessage(messagesContainer, WELCOME_MESSAGE, "bot");
          addQuickReplies(messagesContainer, QUICK_REPLIES_INITIAL, handleSend);
        }, 800);
      }
      if (isOpen) {
        setTimeout(function () { input.focus(); }, 100);
      }
    }

    function handleSend(text) {
      var userText = text || input.value.trim();
      if (!userText) return;
      input.value = "";

      addMessage(messagesContainer, userText, "user");

      showTyping(messagesContainer);

      var delay = 500 + Math.random() * 700;
      setTimeout(function () {
        hideTyping();
        var response = findResponse(userText);
        addMessage(messagesContainer, response.text, "bot");
        addQuickReplies(messagesContainer, response.quickReplies, handleSend);
      }, delay);
    }

    toggle.addEventListener("click", toggleChat);
    sendBtn.addEventListener("click", function () { handleSend(); });
    input.addEventListener("keydown", function (e) {
      if (e.key === "Enter") {
        e.preventDefault();
        handleSend();
      }
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
