/**
 * Calculate estimated reading time from text content.
 * Chinese text: 400 chars/min, English text: 200 words/min.
 * Returns { minutes: number, words: number }.
 */
export function estimateReadingTime(text: string) {
	const chineseChars = (text.match(/[一-鿿]/g) || []).length;
	const englishWords = (text.replace(/[一-鿿]/g, ' ').trim().split(/\s+/).filter(Boolean).length);
	const totalMinutes = Math.ceil(chineseChars / 400 + englishWords / 200);
	return {
		minutes: Math.max(1, totalMinutes),
		words: chineseChars + englishWords,
	};
}
