import { defineComponent, ref, reactive, computed, onBeforeUnmount, TransitionGroup } from 'vue';
import { RippleBase } from '../index'
import './main.less'
export default defineComponent({
    name: 'TouchRipple',
    components: { RippleBase, TransitionGroup },
    props: {
        color: String,
        opacity: Number,
        speed: Number,
        transition: String,
        globalOptions: {
            type: Object,
            default: () => ({})
        }
    },
    setup(props, { slots }) {
        // $refs.inner
        const inner = ref(null)

        const state: {
            id: number,
            ripples: Array<{
                id: number,
                styles: any
            }>,
            rippleCount: number,
            mouseuped: boolean,
            keepLastRipple: boolean
        } = reactive({
            id: 0,
            ripples: [],
            rippleCount: 0,
            mouseuped: true,
            keepLastRipple: false
        })

        const showRipple = computed(() => {
            return state.ripples.length > 0
        })

        const options = computed(() => {
            return Object.assign({
                color: '#fff',
                opacity: 0.3,
                speed: 1,
                transition: 'ease-out'
            }, props.globalOptions)
        })

        function getRippleSize(positionX: number, positionY: number) {
            const width = (inner.value! as HTMLElement).clientWidth
            const height = (inner.value! as HTMLElement).clientHeight
            // 得到点击位置距离最远的点，计算出这两点之间的距离
            const square = (x: number) => x * x
            const coordinates = [[0, 0], [width, 0], [0, height], [width, height]].map(coordinate => {
                return Math.sqrt(square(coordinate[0] - positionX) + square(coordinate[1] - positionY))
            })
            // 最长边即为半径
            const maxCoordinate = Math.max.apply({}, coordinates)
            const size = maxCoordinate * 2
            const left = positionX - size / 2
            const top = positionY - size / 2
            return { size, left, top }
        }

        function mousedown(event: any) {
            console.log(event)
            state.mouseuped = false
            // 计算点击位置、宿主容器尺寸
            const { top: innerY, left: innerX } = (inner.value! as HTMLElement).getBoundingClientRect()
            const { clientX: layerX, clientY: layerY } = event
            const positionX = layerX - innerX
            const positionY = layerY - innerY
            const { size, left, top } = getRippleSize(positionX, positionY)
            // 添加动画进队列
            state.ripples.push({
                id: state.id += 1,
                styles: { size, left, top }
            })
        }

        function mouseup() {
            state.mouseuped = true
            if (state.keepLastRipple) {
                state.ripples = []
            }
        }

        function rippleEnter() {
            state.rippleCount += 1
        }
        function rippleLeave() {
            state.rippleCount -= 1
        }

        function handleRippleEnd(id: number) {
            const targetIndex = state.ripples.findIndex(ripple => ripple.id === id)
            if (targetIndex > -1) {
                // 如果鼠标未抬起，且是最后一个动画，则这个动画的删除权应该交给鼠标抬起事件
                if (!state.mouseuped && (targetIndex === state.ripples.length - 1)) {
                    state.keepLastRipple = true
                    // 否则，直接删除
                } else {
                    state.ripples.splice(targetIndex, 1)
                }
            }
        }

        onBeforeUnmount(() => {
            state.ripples = []
        })

        return () => {
            return <div
                class="touch-ripple-cls"
                onMousedown={mousedown}
                onMouseup={mouseup}
                ref={inner}
            >
                {slots.default ? slots.default() : undefined}
                <div class="touch-ripple" v-show={showRipple.value}>
                    <transition-group
                        tag="div"
                        class="ripple-inner"
                        name="ripple"
                        onEnter={rippleEnter}
                        onAfterLeave={rippleLeave}
                    >
                        {
                            state.ripples.map(ripple => {
                                return <ripple-base
                                    key={ripple.id}
                                    id={ripple.id}
                                    color={props.color || options.value.color}
                                    speed={props.speed || options.value.speed}
                                    opacity={props.opacity || options.value.opacity}
                                    transition={props.transition || options.value.transition}
                                    styles={ripple.styles}
                                    onEnd={handleRippleEnd}
                                />
                            })
                        }

                    </transition-group>
                </div>
            </div>
        }
    }
})