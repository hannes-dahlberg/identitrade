Vue.directive('tooltip', (el, binding) => {
    $(el).tooltip(binding.value)
})