
# Poetry Assistant - Assignment Answers

## Section 1: The Essence of Your Solution (10 points)

The Poetry Assistant is a web application designed to help poets find rhyming words, alliteration words, and count syllables in English words. The core solution addresses the challenge of efficiently searching through a large dictionary (over 224,000 words) to find words that rhyme with a given input word, even if that word itself is not in the dictionary.

The solution combines three key components:

1. **Trie Tree Data Structure**: Provides fast word lookup and prefix matching, enabling efficient searching and validation of words in the dictionary.

2. **Rhyme Mapping System**: Groups words by their rhyme patterns using a hash map, allowing O(1) average-case lookup of rhyming words. This is the core innovation that enables quick rhyme detection without comparing every word in the dictionary.

3. **Original Algorithms**: 
   - A rhyme pattern extraction algorithm that identifies the phonetic ending pattern of words
   - A syllable counting algorithm that estimates syllable count based on vowel patterns

The solution handles edge cases such as words not in the dictionary by computing their rhyme pattern and searching for matches, making it user-friendly and robust.

---

## Section 2: Explanation of Original Algorithms in Non-Technical Language (10 points)

### Algorithm 1: Rhyme Pattern Extraction

This algorithm determines what makes words sound similar at the end. Imagine you're trying to group words that rhyme, like "cat", "hat", and "bat" - they all end with the "at" sound.

The algorithm works by looking at the last few letters of a word to create a "rhyme signature". For most words, it takes the last 2 letters (like "at" from "cat"). However, some words have special endings that need different treatment:

- Words ending in "-ing" (like "running") use the last 3 letters to group them properly
- Words ending in "-ed" (like "played") also use 3 letters to account for different pronunciations
- Words ending in "-er" or "-ly" similarly use 3 letters

This way, "cat" and "splat" both get the signature "at" and are grouped together, even though one is much longer than the other. It's like creating a filing system where words that sound alike are filed in the same folder, regardless of their total length.

### Algorithm 2: Syllable Counting

This algorithm estimates how many beats or syllables a word has when spoken. It's like counting the "drum beats" in a word.

The algorithm looks through the word letter by letter, counting each time it finds a vowel (a, e, i, o, u, or sometimes y) that comes after a consonant. Think of it as counting each time your voice "pulses" when saying the word.

It also applies some special rules:
- If a word ends with "e", that "e" is usually silent, so it doesn't count as a beat (like in "make" - the "e" is silent)
- If a word ends with "le" (like "table"), it adds an extra beat because that ending usually creates its own syllable

So for "beautiful", the algorithm counts: beau-ti-ful = 3 beats, which matches how we naturally say it.

---

## Section 3: Pseudocode for Each Original Algorithm (20 points)

### Algorithm 1: GET-RHYME-PATTERN(word)

```
GET-RHYME-PATTERN(word)
1  lowerWord = LOWERCASE(TRIM(word))
2  if LENGTH(lowerWord) == 0
3      return ""
4  len = LENGTH(lowerWord)
5  if len == 1
6      return lowerWord
7  if len >= 4 and ENDS-WITH(lowerWord, "ing")
8      return SUBSTRING(lowerWord, len - 3, len)
9  if len >= 4 and ENDS-WITH(lowerWord, "ed")
10     return SUBSTRING(lowerWord, len - 3, len)
11 if len >= 4 and (ENDS-WITH(lowerWord, "er") or ENDS-WITH(lowerWord, "ly"))
12     return SUBSTRING(lowerWord, len - 3, len)
13 return SUBSTRING(lowerWord, len - 2, len)
```

### Algorithm 2: COUNT-SYLLABLES(word)

```
COUNT-SYLLABLES(word)
1  lowerWord = LOWERCASE(TRIM(word))
2  if LENGTH(lowerWord) == 0
3      return 0
4  if LENGTH(lowerWord) <= 3
5      return 1
6  syllables = 0
7  prevWasVowel = FALSE
8  vowels = SET("a", "e", "i", "o", "u", "y")
9  for i = 1 to LENGTH(lowerWord)
10     char = lowerWord[i]
11     isVowel = CONTAINS(vowels, char)
12     if isVowel and not prevWasVowel
13         syllables = syllables + 1
14     prevWasVowel = isVowel
15 if ENDS-WITH(lowerWord, "e") and LENGTH(lowerWord) > 3 and syllables > 1
16     syllables = syllables - 1
17 if ENDS-WITH(lowerWord, "le") and syllables > 1
18     syllables = syllables + 1
19 return MAX(1, syllables)
```

---

## Section 4: Data Structures in Your Solution (20 points)

### Data Structure 1: Trie Tree (Trie)

**Description**: A tree-like data structure where each node represents a character, and paths from root to nodes form words.

**Why it's suitable**:
- **Fast Lookup**: O(m) time complexity where m is the length of the word, much faster than linear search through an array
- **Prefix Matching**: Efficiently finds all words starting with a given prefix, which is essential for the alliteration feature
- **Space Efficient**: Shares common prefixes between words, reducing memory usage for large dictionaries
- **Exact Match**: Quickly determines if a word exists in the dictionary, enabling validation of user input

In this application, the Trie is used to store all 224,000+ words, allowing instant word validation and prefix-based searches for alliteration.

### Data Structure 2: Hash Map (Map) for Rhyme Groups

**Description**: A key-value mapping where keys are rhyme patterns (strings) and values are arrays of words sharing that pattern.

**Why it's suitable**:
- **O(1) Average Lookup**: After computing a word's rhyme pattern, finding all rhyming words is constant time on average
- **Direct Access**: Unlike linear search, we can directly access the group of rhyming words without scanning the entire dictionary
- **Efficient Grouping**: Allows pre-computing rhyme groups during initialization, so queries are instant
- **Scalability**: Performance doesn't degrade significantly as the dictionary grows, making it suitable for large datasets

In this application, the Map stores rhyme groups where each key (like "at") maps to an array of all words ending with that pattern (like ["cat", "bat", "hat", "splat"]), enabling instant rhyme lookup.

### Data Structure 3: Array for Word Lists

**Description**: Dynamic arrays used to store words within each rhyme group and as the main word list container.

**Why it's suitable**:
- **Simple and Efficient**: Arrays provide O(1) access time for individual elements
- **Iteration**: Easy to iterate through results for display
- **Dynamic**: Can grow as needed without pre-allocating space
- **Standard Operations**: Native JavaScript arrays support filtering, mapping, and slicing operations needed for result processing

In this application, arrays are used to store the list of words in each rhyme group, allowing easy filtering and display of results.

---

## Section 5: JavaScript Implementations (20 points)

### Implementation 1: Rhyme Pattern Extraction Algorithm

```javascript
_getRhymePattern(word) {
    const lowerWord = word.toLowerCase().trim();
    
    if (lowerWord.length === 0) return '';
    
    const len = lowerWord.length;
    
    // For single character words, return the whole word
    if (len === 1) {
        return lowerWord;
    }
    
    // Special case: words ending in -ing
    if (len >= 4 && lowerWord.endsWith('ing')) {
        return lowerWord.substring(len - 3);
    }
    
    // Special case: words ending in -ed
    if (len >= 4 && lowerWord.endsWith('ed')) {
        return lowerWord.substring(len - 3);
    }
    
    // Special case: words ending in -er or -ly
    if (len >= 4 && (lowerWord.endsWith('er') || lowerWord.endsWith('ly'))) {
        return lowerWord.substring(len - 3);
    }
    
    // For all other cases, use last 2 characters as rhyme pattern
    return lowerWord.substring(len - 2);
}
```

### Implementation 2: Syllable Counting Algorithm

```javascript
countSyllables(word) {
    const lowerWord = word.toLowerCase().trim();
    
    if (lowerWord.length === 0) return 0;
    if (lowerWord.length <= 3) return 1;
    
    let syllables = 0;
    let prevWasVowel = false;
    
    // Define vowel letters
    const vowels = new Set(['a', 'e', 'i', 'o', 'u', 'y']);
    
    // Count vowel groups (consecutive vowels count as one syllable)
    for (let i = 0; i < lowerWord.length; i++) {
        const char = lowerWord[i];
        const isVowel = vowels.has(char);
        
        // If current is vowel and previous was not, count as a syllable
        if (isVowel && !prevWasVowel) {
            syllables++;
        }
        prevWasVowel = isVowel;
    }
    
    // Special case: silent 'e' at the end
    if (lowerWord.endsWith('e') && lowerWord.length > 3 && syllables > 1) {
        syllables--;
    }
    
    // Special case: 'le' ending usually forms a syllable
    if (lowerWord.endsWith('le') && syllables > 1) {
        syllables++;
    }
    
    // Ensure at least one syllable
    return Math.max(1, syllables);
}
```

---

## Section 6: Video Requirements (10 points)

**Instructions for Video Recording**:

Please record a video demonstrating your Poetry Assistant application with the following requirements:

1. **Duration**: Maximum 5 minutes
2. **Resolution**: Minimum 720p
3. **Format**: MP4 (recommended)
4. **Content Requirements**:
   - Source code must be visible in the video
   - Code must be commented to facilitate cross-checking with pseudocode
   - Demonstrate the following features:
     - Loading the word list
     - Finding rhyming words (e.g., search for "cat")
     - Finding alliteration words
     - Counting syllables
     - Show results display
   - Show the browser console if possible to demonstrate loading messages

**What to Show in the Video**:
1. Open the application in a browser
2. Open the source code files (poetry-assistant.js) showing the implementations
3. Show the commented code, especially the two original algorithms
4. Execute searches for rhyming words
5. Execute searches for alliteration
6. Execute syllable counting
7. Show that the application works correctly with various inputs

**Video Recording Software Suggestions**:
- OBS Studio (free, cross-platform)
- QuickTime Player (Mac)
- Windows Game Bar (Windows)
- Loom (online tool)

