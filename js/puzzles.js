/**
 * Puzzle Root - Puzzle Logic
 * Handles puzzle loading, answer checking, progress tracking, and celebrations
 */

// LocalStorage key for puzzle progress
const STORAGE_KEY = 'puzzleRootProgress';

// Analytics: paste your Google Apps Script deployment URL here after setup
const ANALYTICS_ENDPOINT = 'https://script.google.com/macros/s/AKfycbz1trDB8DjuFDKEfiTmBf5cDGtUcj3cpNO-_rpga9JbOJfCDs4FFVLdvHCXofyNa1lH/exec'; // e.g. 'https://script.google.com/macros/s/YOUR_ID/exec'

// Track guess count per puzzle within this page session (resets on reload)
const guessCounts = {};

/**
 * Detect which gallery page we're on
 * @returns {string} 'instagram', 'website', or 'home'
 */
function getCurrentPage() {
    const path = window.location.pathname;
    if (path.includes('instagram')) return 'instagram';
    if (path.includes('website')) return 'website';
    return 'home';
}

/**
 * Send a puzzle attempt event to Google Sheets via Apps Script
 * Uses no-cors mode — response is opaque but the POST is delivered
 * @param {Object} eventData - Event data to log
 */
function logPuzzleEvent(eventData) {
    if (!ANALYTICS_ENDPOINT) return; // Silent no-op if not configured
    fetch(ANALYTICS_ENDPOINT, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(eventData)
    }).catch(function(err) {
        // Never throw — analytics must never break the puzzle experience
        console.warn('Analytics logging failed (non-critical):', err);
    });
}

/**
 * Check if preview mode is enabled via URL parameter
 * @returns {boolean} True if ?preview=true is in URL
 */
function isPreviewMode() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('preview') === 'true';
}

/**
 * Check if a puzzle should be visible based on publish date
 * @param {Object} puzzle - Puzzle object with datePublished field
 * @returns {boolean} True if puzzle should be shown
 */
function isPuzzlePublished(puzzle) {
    // In preview mode, show all puzzles
    if (isPreviewMode()) {
        return true;
    }

    // Otherwise, only show if publish date/time has passed
    const publishDate = new Date(puzzle.datePublished);
    const now = new Date();
    return publishDate <= now;
}

/**
 * Get puzzle progress from localStorage
 * @returns {Object} Progress data with puzzle IDs as keys
 */
function getProgress() {
    try {
        const data = localStorage.getItem(STORAGE_KEY);
        return data ? JSON.parse(data) : {};
    } catch (error) {
        console.error('Error reading progress from localStorage:', error);
        return {};
    }
}

/**
 * Save puzzle progress to localStorage
 * @param {Object} progress - Progress data to save
 */
function saveProgress(progress) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch (error) {
        console.error('Error saving progress to localStorage:', error);
    }
}

/**
 * Mark a puzzle as solved
 * @param {string} puzzleId - The ID of the solved puzzle
 */
function markPuzzleSolved(puzzleId) {
    const progress = getProgress();
    progress[puzzleId] = {
        solved: true,
        solvedAt: new Date().toISOString()
    };
    saveProgress(progress);
}

/**
 * Check if a puzzle is solved
 * @param {string} puzzleId - The ID of the puzzle to check
 * @returns {boolean} True if solved, false otherwise
 */
function isPuzzleSolved(puzzleId) {
    const progress = getProgress();
    return progress[puzzleId]?.solved || false;
}

/**
 * Get count of solved puzzles
 * @param {Array} puzzleIds - Optional array of puzzle IDs to count from (default: all)
 * @returns {number} Number of solved puzzles
 */
function getSolvedCount(puzzleIds = null) {
    const progress = getProgress();
    if (puzzleIds) {
        return puzzleIds.filter(id => progress[id]?.solved).length;
    }
    return Object.values(progress).filter(p => p.solved).length;
}

/**
 * Normalize answer for flexible matching
 * - Converts to lowercase
 * - Trims whitespace
 * - Collapses multiple spaces to single space
 * @param {string} answer - The answer to normalize
 * @returns {string} Normalized answer
 */
function normalizeAnswer(answer) {
    return answer
        .toLowerCase()
        .trim()
        .replace(/\s+/g, ' ');
}

/**
 * Check if the submitted answer is correct
 * @param {string} submitted - User's submitted answer
 * @param {string} correct - The correct answer
 * @returns {boolean} True if answers match
 */
function checkAnswer(submitted, correct) {
    return normalizeAnswer(submitted) === normalizeAnswer(correct);
}

/**
 * Create confetti celebration animation
 */
function createConfetti() {
    // Only create confetti if user hasn't set reduced motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return;
    }

    const container = document.createElement('div');
    container.className = 'celebration-container';
    document.body.appendChild(container);

    // Create 50 confetti pieces
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.animationDelay = Math.random() * 0.5 + 's';
        confetti.style.animationDuration = (Math.random() * 2 + 2) + 's';
        container.appendChild(confetti);
    }

    // Remove confetti after animation completes
    setTimeout(() => {
        container.remove();
    }, 4000);
}

/**
 * Handle puzzle answer submission
 * @param {Event} event - Form submit event
 * @param {Object} puzzle - Puzzle data
 */
function handleAnswerSubmit(event, puzzle) {
    event.preventDefault();

    const form = event.target;
    const input = form.querySelector('.answer-input');
    const feedback = form.querySelector('.feedback-message');
    const submitBtn = form.querySelector('.btn-primary');

    const userAnswer = input.value;

    if (!userAnswer.trim()) {
        showFeedback(feedback, 'Please enter an answer', 'error');
        return;
    }

    // Disable submit button temporarily
    submitBtn.disabled = true;

    // Track guess number for this puzzle in this session
    if (!guessCounts[puzzle.id]) {
        guessCounts[puzzle.id] = 0;
    }
    guessCounts[puzzle.id]++;
    const currentGuessNumber = guessCounts[puzzle.id];

    if (checkAnswer(userAnswer, puzzle.answer)) {
        // Correct answer!
        markPuzzleSolved(puzzle.id);
        showFeedback(feedback, 'Correct! 🎉', 'success');

        // Log correct solve event
        logPuzzleEvent({
            timestamp: new Date().toISOString(),
            puzzleId: puzzle.id,
            puzzleTitle: puzzle.title,
            page: getCurrentPage(),
            correct: true,
            guessNumber: currentGuessNumber
        });

        // Create celebration
        createConfetti();

        // Update the puzzle card to show solved state
        setTimeout(() => {
            const puzzleCard = form.closest('.puzzle-card');
            puzzleCard.classList.add('just-solved');
            showSolvedState(puzzleCard, puzzle);

            // Update solve counter
            updateAllSolveCounters();
        }, 1000);
    } else {
        // Incorrect answer
        showFeedback(feedback, 'Try Again', 'error');
        input.value = '';
        input.focus();

        // Log incorrect guess event
        logPuzzleEvent({
            timestamp: new Date().toISOString(),
            puzzleId: puzzle.id,
            puzzleTitle: puzzle.title,
            page: getCurrentPage(),
            correct: false,
            guessNumber: currentGuessNumber
        });

        // Re-enable button after short delay
        setTimeout(() => {
            submitBtn.disabled = false;
        }, 500);
    }
}

/**
 * Show feedback message
 * @param {HTMLElement} feedbackElement - The feedback message element
 * @param {string} message - Message to display
 * @param {string} type - 'success' or 'error'
 */
function showFeedback(feedbackElement, message, type) {
    feedbackElement.textContent = message;
    feedbackElement.className = `feedback-message ${type}`;
    feedbackElement.style.display = 'block';
}

/**
 * Show solved state for a puzzle card
 * @param {HTMLElement} puzzleCard - The puzzle card element
 * @param {Object} puzzle - Puzzle data
 */
function showSolvedState(puzzleCard, puzzle) {
    puzzleCard.classList.add('solved');

    // Add solved badge to image
    const imageWrapper = puzzleCard.querySelector('.puzzle-image-wrapper');
    if (imageWrapper && !imageWrapper.querySelector('.solved-badge')) {
        const badge = document.createElement('div');
        badge.className = 'solved-badge';
        badge.innerHTML = '<span class="checkmark">✓</span> Solved';
        imageWrapper.appendChild(badge);
    }

    // Replace answer form with solved display
    const answerForm = puzzleCard.querySelector('.answer-form');
    if (answerForm) {
        const solvedDisplay = document.createElement('div');
        solvedDisplay.className = 'puzzle-solved';
        solvedDisplay.innerHTML = `
            <h4>Puzzle Solved!</h4>
            <p class="puzzle-solved-answer">${puzzle.answer}</p>
        `;
        answerForm.replaceWith(solvedDisplay);
    }
}

/**
 * Create HTML for a puzzle card
 * @param {Object} puzzle - Puzzle data
 * @param {string} type - 'instagram' or 'website'
 * @param {boolean} enableLightbox - Whether to wrap image with GLightbox anchor (default: true)
 * @returns {string} HTML string
 */
function createPuzzleCard(puzzle, type, enableLightbox = true) {
    const isSolved = isPuzzleSolved(puzzle.id);
    const solvedClass = isSolved ? 'solved' : '';
    const solvedBadge = isSolved ? '<div class="solved-badge"><span class="checkmark">✓</span> Solved</div>' : '';

    const imageHtml = enableLightbox
        ? `<a href="${puzzle.imageUrl}" class="glightbox" data-type="image" data-title="${puzzle.title}" aria-label="Expand image: ${puzzle.title}">
                <img src="${puzzle.imageUrl}" alt="${puzzle.title}" class="puzzle-image" loading="lazy">
                <span class="lightbox-hint" aria-hidden="true">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true">
                        <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                        <line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/>
                    </svg>
                </span>
           </a>`
        : `<img src="${puzzle.imageUrl}" alt="${puzzle.title}" class="puzzle-image" loading="lazy">`;

    let card = `
        <article class="puzzle-card ${solvedClass} fade-in" data-puzzle-id="${puzzle.id}" id="${puzzle.id}">
            <div class="puzzle-image-wrapper">
                ${imageHtml}
                ${solvedBadge}
            </div>
            <div class="puzzle-content">
                <h3 class="puzzle-title">${puzzle.title}</h3>
    `;

    if (type === 'instagram') {
        card += `
                <p class="puzzle-description">${puzzle.caption}</p>
                <a href="${puzzle.instagramUrl}" target="_blank" rel="noopener noreferrer" class="puzzle-link">
                    View on Instagram →
                </a>
        `;
    } else {
        card += `
                <p class="puzzle-description">${puzzle.description}</p>
        `;
    }

    if (isSolved) {
        card += `
                <div class="puzzle-solved">
                    <h4>Puzzle Solved!</h4>
                    <p class="puzzle-solved-answer">${puzzle.answer}</p>
                </div>
        `;
    } else {
        card += `
                <form class="answer-form" data-puzzle-id="${puzzle.id}">
                    <div class="answer-input-group">
                        <input
                            type="text"
                            class="answer-input"
                            placeholder="Enter your answer..."
                            aria-label="Your answer"
                            autocomplete="off"
                        >
                        <button type="submit" class="btn btn-primary">Submit</button>
                    </div>
                    <div class="feedback-message" style="display: none;" role="alert"></div>
                </form>
        `;
    }

    card += `
            </div>
        </article>
    `;

    return card;
}

/**
 * Load and display Instagram puzzles
 */
async function loadInstagramPuzzles() {
    const container = document.getElementById('instagram-puzzles-list');
    const counter = document.getElementById('instagram-solve-counter');

    if (!container) return;

    try {
        const response = await fetch('/data/instagram-puzzles.json');
        let puzzles = await response.json();

        // Filter to only show published puzzles (unless in preview mode)
        puzzles = puzzles.filter(isPuzzlePublished);

        if (puzzles.length === 0) {
            container.innerHTML = '<p class="text-center">No Instagram puzzles yet. Check back soon!</p>';
            return;
        }

        // Sort by date (newest first)
        puzzles.sort((a, b) => new Date(b.datePublished) - new Date(a.datePublished));

        // Render puzzles
        container.innerHTML = puzzles.map(puzzle => createPuzzleCard(puzzle, 'instagram')).join('');

        // Attach event listeners to answer forms
        attachFormListeners(puzzles);

        // Initialize lightbox for puzzle images
        if (typeof GLightbox !== 'undefined') {
            GLightbox({ selector: '.glightbox', touchNavigation: true, loop: false, zoomable: true });
        }

        // Update solve counter
        if (counter) {
            const solved = getSolvedCount(puzzles.map(p => p.id));
            counter.textContent = `You've solved ${solved} of ${puzzles.length} Instagram puzzles`;
        }

        // Scroll to puzzle if hash is present in URL
        scrollToHashIfPresent();
    } catch (error) {
        console.error('Error loading Instagram puzzles:', error);
        container.innerHTML = '<p class="text-center error">Error loading puzzles. Please try again later.</p>';
    }
}

/**
 * Load and display website puzzles
 */
async function loadWebsitePuzzles() {
    const container = document.getElementById('website-puzzles-list');
    const counter = document.getElementById('website-solve-counter');

    if (!container) return;

    try {
        const response = await fetch('/data/website-puzzles.json');
        let puzzles = await response.json();

        // Filter to only show published puzzles (unless in preview mode)
        puzzles = puzzles.filter(isPuzzlePublished);

        if (puzzles.length === 0) {
            container.innerHTML = '<p class="text-center">No website puzzles yet. Check back soon!</p>';
            return;
        }

        // Sort by date (newest first)
        puzzles.sort((a, b) => new Date(b.datePublished) - new Date(a.datePublished));

        // Render puzzles
        container.innerHTML = puzzles.map(puzzle => createPuzzleCard(puzzle, 'website')).join('');

        // Attach event listeners to answer forms
        attachFormListeners(puzzles);

        // Initialize lightbox for puzzle images
        if (typeof GLightbox !== 'undefined') {
            GLightbox({ selector: '.glightbox', touchNavigation: true, loop: false, zoomable: true });
        }

        // Update solve counter
        if (counter) {
            const solved = getSolvedCount(puzzles.map(p => p.id));
            counter.textContent = `You've solved ${solved} of ${puzzles.length} website puzzles`;
        }

        // Scroll to puzzle if hash is present in URL
        scrollToHashIfPresent();
    } catch (error) {
        console.error('Error loading website puzzles:', error);
        container.innerHTML = '<p class="text-center error">Error loading puzzles. Please try again later.</p>';
    }
}

/**
 * Scroll to puzzle if hash is present in URL
 * Called after puzzles are loaded to handle direct links to specific puzzles
 */
function scrollToHashIfPresent() {
    if (window.location.hash) {
        const targetId = window.location.hash.substring(1); // Remove the # symbol
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
            // Small delay to ensure rendering is complete
            setTimeout(() => {
                targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 100);
        }
    }
}

/**
 * Load recent puzzles for home page (mix of Instagram and website)
 */
async function loadRecentPuzzles() {
    const container = document.getElementById('recent-puzzles-list');
    if (!container) return;

    try {
        // Load both sets of puzzles
        const [igResponse, webResponse] = await Promise.all([
            fetch('/data/instagram-puzzles.json'),
            fetch('/data/website-puzzles.json')
        ]);

        let igPuzzles = await igResponse.json();
        let webPuzzles = await webResponse.json();

        // Filter to only show published puzzles (unless in preview mode)
        igPuzzles = igPuzzles.filter(isPuzzlePublished);
        webPuzzles = webPuzzles.filter(isPuzzlePublished);

        // Combine and sort by date (newest first)
        const allPuzzles = [
            ...igPuzzles.map(p => ({ ...p, type: 'instagram' })),
            ...webPuzzles.map(p => ({ ...p, type: 'website' }))
        ].sort((a, b) => new Date(b.datePublished) - new Date(a.datePublished));

        // Take only the 5 most recent
        const recentPuzzles = allPuzzles.slice(0, 5);

        if (recentPuzzles.length === 0) {
            container.innerHTML = '<p class="text-center">No puzzles yet. Check back soon!</p>';
            return;
        }

        // Render puzzles (no lightbox on carousel — cards navigate to puzzle pages on click)
        container.innerHTML = recentPuzzles.map(puzzle => createPuzzleCard(puzzle, puzzle.type, false)).join('');

        // Attach event listeners
        attachFormListeners(recentPuzzles);
        attachCarouselCardClickHandlers(recentPuzzles);
    } catch (error) {
        console.error('Error loading recent puzzles:', error);
        container.innerHTML = '<p class="text-center error">Error loading puzzles. Please try again later.</p>';
    }
}

/**
 * Attach event listeners to puzzle answer forms
 * @param {Array} puzzles - Array of puzzle objects
 */
function attachFormListeners(puzzles) {
    const forms = document.querySelectorAll('.answer-form');
    forms.forEach(form => {
        const puzzleId = form.getAttribute('data-puzzle-id');
        const puzzle = puzzles.find(p => p.id === puzzleId);

        if (puzzle) {
            form.addEventListener('submit', (event) => handleAnswerSubmit(event, puzzle));
        }
    });
}

/**
 * Attach click handlers to carousel cards for navigation
 * @param {Array} puzzles - Array of puzzle objects with type property
 */
function attachCarouselCardClickHandlers(puzzles) {
    const carouselCards = document.querySelectorAll('.puzzle-carousel-track .puzzle-card');
    carouselCards.forEach(card => {
        const puzzleId = card.getAttribute('data-puzzle-id');
        const puzzle = puzzles.find(p => p.id === puzzleId);

        if (puzzle) {
            // Make the card clickable (except for form elements)
            card.style.cursor = 'pointer';
            card.addEventListener('click', (event) => {
                // Don't navigate if clicking on form elements
                if (event.target.closest('.answer-form')) {
                    return;
                }

                // Navigate to the appropriate page with hash
                const page = puzzle.type === 'instagram' ? 'instagram-puzzles.html' : 'website-puzzles.html';
                window.location.href = `/${page}#${puzzle.id}`;
            });
        }
    });
}

/**
 * Update solve counter display
 * @param {string} counterId - ID of the counter element
 */
function updateSolveCounter(counterId) {
    const counter = document.getElementById(counterId);
    if (!counter) return;

    const totalSolved = getSolvedCount();
    counter.textContent = `You've solved ${totalSolved} puzzle${totalSolved !== 1 ? 's' : ''}`;
}

/**
 * Update all solve counters on the page
 */
function updateAllSolveCounters() {
    // Update home page counter if present
    const homeCounter = document.getElementById('home-solve-counter');
    if (homeCounter) {
        updateSolveCounter('home-solve-counter');
    }

    // Update page-specific counters
    updatePageSpecificCounters();
}

/**
 * Update page-specific solve counters
 */
async function updatePageSpecificCounters() {
    const igCounter = document.getElementById('instagram-solve-counter');
    const webCounter = document.getElementById('website-solve-counter');

    if (igCounter) {
        try {
            const response = await fetch('/data/instagram-puzzles.json');
            const puzzles = await response.json();
            const solved = getSolvedCount(puzzles.map(p => p.id));
            igCounter.textContent = `You've solved ${solved} of ${puzzles.length} Instagram puzzles`;
        } catch (error) {
            console.error('Error updating Instagram counter:', error);
        }
    }

    if (webCounter) {
        try {
            const response = await fetch('/data/website-puzzles.json');
            const puzzles = await response.json();
            const solved = getSolvedCount(puzzles.map(p => p.id));
            webCounter.textContent = `You've solved ${solved} of ${puzzles.length} website puzzles`;
        } catch (error) {
            console.error('Error updating website counter:', error);
        }
    }
}

/**
 * Handle footer email signup form submission
 * Shows thank-you message in place of form after successful submit
 */
function initFooterSignup() {
    const form = document.getElementById('footer-signup-form');
    const thanksMsg = document.getElementById('footer-signup-thanks');

    if (!form || !thanksMsg) return;

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const emailInput = form.querySelector('[name="email"]');
        if (!emailInput || !emailInput.value.trim()) return;

        const formData = new FormData(form);

        fetch('/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams(formData).toString()
        })
        .then(function() {
            form.style.display = 'none';
            thanksMsg.style.display = 'block';
        })
        .catch(function(error) {
            console.error('Email signup error:', error);
            // Graceful fallback: let native form submit handle it
            form.submit();
        });
    });
}

// Initialize footer signup on all pages
document.addEventListener('DOMContentLoaded', function() {
    initFooterSignup();
});
