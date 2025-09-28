import translate from '@vitalets/google-translate-api';
import langs from 'langs';

export default async function handler(req, res) {
  const start = Date.now();
  const { text, to } = req.query;

  if (!text || !to) {
    return res.status(400).json({
      status: '❌ خطأ في الطلب',
      message: 'يرجى تحديد text و to في الرابط، مثل: ?text=hello&to=ar',
      example: '/api/translate?text=hello&to=fr',
      powered_by: 'taeh-tarjama ⚡'
    });
  }

  try {
    const result = await translate(text, { to });

    const fromLang = langs.where("1", result.from.language.iso);
    const toLang = langs.where("1", to);

    res.status(200).json({
      status: "✅ تم الترجمة بنجاح",
      original_text: text,
      translated_text: result.text,
      from_language: fromLang?.name || result.from.language.iso,
      to_language: toLang?.name || to,
      took: `${Date.now() - start}ms`,
      powered_by: "taeh-tarjama ⚡"
    });
  } catch (err) {
    res.status(500).json({
      status: "❌ حصل خطأ أثناء الترجمة",
      error: err.message,
      powered_by: "taeh-tarjama ⚡"
    });
  }
}
