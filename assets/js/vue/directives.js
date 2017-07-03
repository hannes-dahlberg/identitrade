//Directive for jquery tooltip (nicer looking html tooltip)
Vue.directive('tooltip', (el, binding) => {
    $(el).tooltip(binding.value)
})