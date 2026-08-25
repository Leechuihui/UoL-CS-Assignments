/**
 * Application Main Logic
 * Handles user interaction and UI updates
 */

let wordListData = [];

/**
 * Initialize application
 */
async function init() {
    try {
        // Show loading state
        showLoading('Loading word list...');
        
        // Load words from wordlist.txt
        const response = await fetch('wordlist.txt');
        const text = await response.text();
        const words = text.split('\n')
            .map(line => line.trim())
            .filter(line => line.length > 0);
        
        wordListData = words;
        
        // Load into poetry assistant
        await poetryAssistant.loadWordList(wordListData);
        
        // Show ready state
        hideLoading();
        
    } catch (error) {
        console.error('Failed to load word list:', error);
        showError('Failed to load word list. Please ensure wordlist.txt file exists.');
    }
}

/**
 * Handle rhyming word search
 */
function handleSearch() {
    const input = document.getElementById('wordInput');
    const word = input.value.trim();
    
    if (!word) {
        showError('Please enter a word');
        return;
    }
    
    showLoading('Finding rhyming words...');
    
    setTimeout(() => {
        const result = poetryAssistant.findRhymes(word);
        
        if (result.error) {
            showError(result.error);
        } else {
            showRhymes(result);
        }
    }, 100);
}

/**
 * Handle alliteration lookup
 */
function handleAlliteration() {
    const input = document.getElementById('wordInput');
    const word = input.value.trim();
    
    if (!word) {
        showError('Please enter a word');
        return;
    }
    
    showLoading('Finding alliteration words...');
    
    setTimeout(() => {
        const result = poetryAssistant.findAlliteration(word);
        
        if (result.error) {
            showError(result.error);
        } else {
            showAlliteration(result);
        }
    }, 100);
}

/**
 * Handle syllable count
 */
function handleSyllableCount() {
    const input = document.getElementById('wordInput');
    const word = input.value.trim();
    
    if (!word) {
        showError('Please enter a word');
        return;
    }
    
    const result = poetryAssistant.getSyllableCount(word);
    showSyllableCount(result);
}

/**
 * Display rhyming word results
 */
function showRhymes(result) {
    const resultsDiv = document.getElementById('results');
    
    if (result.rhymes.length === 0) {
        resultsDiv.innerHTML = `
            <div class="result-card">
                <div class="result-title">🔍 Rhyming Words Search Results</div>
                <div class="result-content">
                    <p>No words found that rhyme with "<strong>${result.word}</strong>"</p>
                </div>
            </div>
        `;
        return;
    }
    
    // Limit display count to avoid overly long interface
    const displayRhymes = result.rhymes.slice(0, 100);
    
    const rhymesHTML = displayRhymes
        .map(rhyme => `<span class="rhyme-word" onclick="selectWord('${rhyme}')">${rhyme}</span>`)
        .join('');
    
    let infoMessage = '';
    if (result.wordExists === false) {
        infoMessage = '<p style="color: #888; font-size: 0.9em; margin-bottom: 10px;">ℹ️ Note: This word is not in the word list, but rhyming words were found based on rhyme pattern.</p>';
    }
    
    resultsDiv.innerHTML = `
        <div class="result-card">
            <div class="result-title">🔍 Rhyming Words Search Results</div>
            <div class="result-content">
                ${infoMessage}
                <p>Words that rhyme with "<strong>${result.word}</strong>":</p>
                <div style="margin-top: 15px;">
                    ${rhymesHTML}
                </div>
            </div>
            <div class="stats">
                <div class="stat-item">
                    <div class="stat-label">Rhyming Words Found</div>
                    <div class="stat-value">${result.count}</div>
                </div>
            </div>
        </div>
    `;
}

/**
 * Display alliteration results
 */
function showAlliteration(result) {
    const resultsDiv = document.getElementById('results');
    
    if (result.words.length === 0) {
        resultsDiv.innerHTML = `
            <div class="result-card">
                <div class="result-title">✨ Alliteration Search Results</div>
                <div class="result-content">
                    <p>No words found starting with "<strong>${result.letter}</strong>"</p>
                </div>
            </div>
        `;
        return;
    }
    
    const wordsHTML = result.words
        .map(word => `<span class="rhyme-word" onclick="selectWord('${word}')">${word}</span>`)
        .join('');
    
    resultsDiv.innerHTML = `
        <div class="result-card">
            <div class="result-title">✨ Alliteration Search Results</div>
            <div class="result-content">
                <p>Words starting with "<strong>${result.letter}</strong>":</p>
                <div style="margin-top: 15px;">
                    ${wordsHTML}
                </div>
            </div>
            <div class="stats">
                <div class="stat-item">
                    <div class="stat-label">Words Found</div>
                    <div class="stat-value">${result.count}</div>
                </div>
            </div>
        </div>
    `;
}

/**
 * Display syllable count results
 */
function showSyllableCount(result) {
    const resultsDiv = document.getElementById('results');
    
    resultsDiv.innerHTML = `
        <div class="result-card">
            <div class="result-title">📏 Syllable Count Results</div>
            <div class="result-content">
                <p>The word "<strong>${result.word}</strong>" has <strong>${result.syllables}</strong> syllable${result.syllables !== 1 ? 's' : ''}</p>
            </div>
            <div class="stats">
                <div class="stat-item">
                    <div class="stat-label">Syllables</div>
                    <div class="stat-value">${result.syllables}</div>
                </div>
            </div>
        </div>
    `;
}

/**
 * Display error message
 */
function showError(message) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = `
        <div class="result-card error">
            <div class="result-title">❌ Error</div>
            <div class="result-content">
                <p>${message}</p>
            </div>
        </div>
    `;
}

/**
 * Show loading state
 */
function showLoading(message) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = `
        <div class="loading">
            <p>${message}</p>
        </div>
    `;
}

/**
 * Hide loading state
 */
function hideLoading() {
    const resultsDiv = document.getElementById('results');
    if (resultsDiv.innerHTML.includes('loading')) {
        resultsDiv.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">✍️</div>
                <p>Enter a word to start finding rhyming words</p>
            </div>
        `;
    }
}

/**
 * Select a word (used when clicking on a rhyming word)
 */
function selectWord(word) {
    const input = document.getElementById('wordInput');
    input.value = word;
    handleSearch();
}

// Initialize when page loads
window.addEventListener('DOMContentLoaded', init);

