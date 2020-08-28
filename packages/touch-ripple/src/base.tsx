import { defineComponent, reactive, computed, nextTick, onMounted, onBeforeUnmount } from 'vue'

export default defineComponent({
    name: 'RippleBase',
    props: {
        id: Number,
        color: String,
        opacity: Number,
        speed: Number,
        styles: {
            type: Object,
            default: () => { }
        },
        transition: String
    },
    setup(props, {
        emit
    }) {
        const state = reactive({
            timers: {
                transform: -1,
                rippling: -1
            },
            baseSpeed: 0.5,
            coreStyle: {
                transform: 'scale(0)'
            }
        })

        const computeSpeed = computed(() => {
            return props.speed ? state.baseSpeed / props.speed : state.baseSpeed
        })

        const computeStyle = computed(() => {
            return {
                'z-index': props.id,
                opacity: props.opacity,
                top: `${props.styles.top}px`,
                left: `${props.styles.left}px`,
                width: `${props.styles.size}px`,
                height: `${props.styles.size}px`,
                transform: state.coreStyle.transform,
                'background-color': props.color,
                'transition-duration': `${computeSpeed.value}s, 0.4s`,
                'transition-timing-function': `${props.transition}, ease-out`
            }
        })

        function startRipple() {
            nextTick(() => {
                state.timers.transform = setTimeout(() => {
                    state.coreStyle.transform = 'scale(1)'
                }, 0)

                state.timers.rippling = setTimeout(() => {
                    emit('end', props.id)
                }, computeSpeed.value * 1000)
            })
        }

        onMounted(() => {
            startRipple()
        })

        onBeforeUnmount(() => {
            if (state.timers.rippling !== -1) {
                clearTimeout(state.timers.rippling)
                state.timers.rippling = -1
            }

            if (state.timers.transform !== -1) {
                clearTimeout(state.timers.transform)
                state.timers.transform = -1
            }
        })

        return () => {
            return <div class="ripple-base" style={computeStyle.value}>
            </div>
        }
    }
}) 