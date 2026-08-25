# Poetry Assistant

A JavaScript-based poetry creation assistant application that helps poets find rhyming words, alliteration words, and count syllables in English words.

## Features

1. **Rhyming Words Search**: Enter a word to find all words that rhyme with it
2. **Alliteration Assistant**: Find words starting with the same letter
3. **Syllable Count**: Calculate the number of syllables in a word

## Technical Implementation

### Data Structures

1. **Trie Tree (Prefix Tree)**
   - Used for efficient word storage and prefix lookup
   - Supports fast word existence checking
   - Supports finding all words starting with a given prefix

2. **Rhyme Map (RhymeMap)**
   - Uses hash table (Map) to organize words by rhyme pattern
   - Key: Rhyme pattern (based on word ending letter sequence)
   - Value: Array of words with the same rhyme pattern

### Algorithms

1. **Rhyme Detection Algorithm** (Original)
   - Identifies rhyme patterns based on word ending letter sequences
   - Considers common English word endings (-ed, -ing, -er, -ly, etc.)
   - Extracts last 2-3 characters as rhyme pattern
   - Uses different pattern lengths for better matching results

2. **Syllable Counting Algorithm**
   - Estimates syllable count based on vowel letter frequency
   - Considers special rules (e.g., ending 'e' is usually silent)

## File Structure

```
poetry-assistant/
├── index.html              # Main HTML file
├── styles.css              # Stylesheet file
├── poetry-assistant.js     # Core algorithms and data structures
├── app.js                  # Application logic
├── wordlist.txt           # Word list (224,714 words)
└── README.md              # Documentation
```

## Usage

1. Ensure all files are in the same directory
2. Open `index.html` using a local server (recommended: VS Code Live Server extension)
   - Or use Python: `python -m http.server 8000`
   - Then visit `http://localhost:8000`
3. Enter a word in the input box (e.g., cat)
4. Click the "Find Rhyming Words" button to view results

## Examples

### Find Rhyming Words
- Input: `cat`
- Result: `bat, hat, mat, rat, sat, pat, flat, chat, that`, etc.

### Alliteration Assistant
- Input: `cat`
- Result: All words starting with 'c'

### Syllable Count
- Input: `beautiful`
- Result: 3 syllables

## Data Source

Word list from: https://introcs.cs.princeton.edu/java/data/wordlist.txt

Contains 224,714 English words.

## Browser Compatibility

- Chrome (recommended)
- Firefox
- Safari
- Edge

## Notes

- Due to the large word list (approximately 2.3MB), initial loading may take a few seconds
- The rhyme detection algorithm is based on letter patterns and may not be as precise as phonetic-based methods, but provides useful results in most cases
