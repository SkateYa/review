<template>
	<div>
		<Student name="李四" sex="女" :age="18" :obj="obj" :arr="arr" />
	</div>
</template>

<script>
import Student from './components/Student'

export default {
	name: 'App',
	components: { Student },
	data() {
		return {
			arr: [1, 2, 3],
			obj: {
				a: 1
			}
		}
	}
}
</script>
