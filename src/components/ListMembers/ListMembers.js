import AddMember from '../AddMember/index.vue';
import { data } from '../../data'
export default {
  name: 'list-members',
  components: { AddMember },
  props: [],
  data() {
    return {
      currentSort: 'name',
      currentSortOrder: 'asc',
      users: data,
      getUserToEdit: null,
      showForm: false,
      active: false,
      value: null,
      memberID: null,
      title: ''
    }
  },
  created() {

  },
  computed: {

  },
  mounted() {

  },
  methods: {
    editMember: function (member) {
      this.getUserToEdit = member;
      if (this.getUserToEdit) {
        this.showForm = true
      } else {
        this.showForm = false
      }
    },
    deleteMember: function (item) {
      this.memberID = item.id;
      this.title = `Are you want to delele "${item.name}" ?`
    },
    getMemberFromAdd: function (member) {
      const newMember = JSON.parse(JSON.stringify(member));
      if (!newMember.id) {
        this.users.push({
          id: this.users.length + 1,
          ...newMember
        });
      } else {
        this.users = this.users.map(user => {
          if (user.id === newMember.id) {
            user = newMember
          }
          return user
        });
        // this.users = editUser;
      }
    },
    onConfirm() {
      this.value = 'Agreed';
      this.users = this.users.filter(x => {
        return x.id !== this.memberID
      })
    },
    onCancel() {
      this.value = 'NO'
    }
  }
}


