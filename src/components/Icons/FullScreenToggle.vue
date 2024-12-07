<script setup>
    function toggleFS() {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            }
        }
    }

    const props = defineProps({
        right: {
            type: Number,
            default: 10
        },
        top: {
            type: Number,
            default: 10
        }
    });

</script>

<template>
<!-- FullScreenToggleButton -->
    <button class="js-toggle-fullscreen-btn toggle-fullscreen-btn" aria-label="Enter fullscreen mode" @click="toggleFS" :style="`right:${right}px; top:${top}px`">
        <svg class="toggle-fullscreen-svg" width="28" height="28" viewBox="-2 -2 28 28">
            <g class="icon-fullscreen-enter">
                <path d="M 2 9 v -7 h 7" />
                <path d="M 22 9 v -7 h -7" />
                <path d="M 22 15 v 7 h -7" />
                <path d="M 2 15 v 7 h 7" />
            </g>
            
            <g class="icon-fullscreen-leave">
                <path d="M 24 17 h -7 v 7" />
                <path d="M 0 17 h 7 v 7" />
                <path d="M 0 7 h 7 v -7" />
                <path d="M 24 7 h -7 v -7" />
            </g>
        </svg>
    </button>
</template>
<style scoped>
/* ToggleFullScreen */
.toggle-fullscreen-btn {
	position: fixed;
	z-index: 10000;
	top: 10px;
	right: 10px;
	border: 0;
	padding: 0;
	background: none;
	cursor: pointer;
	outline: none;
}


.toggle-fullscreen-svg {
	display: block;
	height: auto;
}

.toggle-fullscreen-svg path {
	transform-box: view-box;
	transform-origin: 12px 12px;
	fill: none;
	stroke: var(--p-text-color);
	stroke-width: 4;
	transition: .15s;
}


.toggle-fullscreen-btn:hover path:nth-child(1),
.toggle-fullscreen-btn:focus path:nth-child(1) {
	transform: translate(-2px, -2px);
}

.toggle-fullscreen-btn:hover path:nth-child(2),
.toggle-fullscreen-btn:focus path:nth-child(2) {
	transform: translate(2px, -2px);
}

.toggle-fullscreen-btn:hover path:nth-child(3),
.toggle-fullscreen-btn:focus path:nth-child(3) {
	transform: translate(2px, 2px);
}

.toggle-fullscreen-btn:hover path:nth-child(4),
.toggle-fullscreen-btn:focus path:nth-child(4) {
	transform: translate(-2px, 2px);
}


.toggle-fullscreen-btn:not(.on) .icon-fullscreen-leave {
	display: none;
}

.toggle-fullscreen-btn.on .icon-fullscreen-enter {
	display: none;
}

.toggle-fullscreen-btn:focus  {
  border: none;
}
</style>