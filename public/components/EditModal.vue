<template>
  <div :id="modalId" class="modal modal-fixed-footer">
    <div class="modal-content">
      <!-- editing rules -->
      <h4>Edit Rules</h4>
      <table>
        <thead>
          <tr>
            <th class="tbl-col-sm">Points</th>
            <th>Rule</th>
            <!-- col for icons -->
            <th class="tbl-col-sm"></th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="(rule, index) of editableRules" :key="rule.id">
            <td>
              <input type="number" v-model="rule.pts" @blur="handleRuleEdited(rule)" @keyup="checkAddRule(index)">
            </td>
            <td>
              <input type="text" v-model="rule.desc" @blur="handleRuleEdited(rule)" @keyup="checkAddRule(index)">
            </td>
            <td @click="deleteItem(rule, index)">
              <i v-if="!isLastRule(index)" class="material-icons red-text text-darken-2 btn-clickable">delete</i>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- editing comments -->
      <h4>Edit Comment</h4>
      <table>
        <thead>
          <tr>
            <th>Description</th>
            <!-- col for icons -->
            <th class="tbl-col-sm"></th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="(comment, index) of editableComments" :key="comment.id">
            <td>
              <input
                type="text"
                v-model="comment.desc"
                @blur="handleCommentEdited(comment)"
                @keyup="checkAddComment(index)"
              >
            </td>
            <td @click="deleteItem(comment, index)">
              <i v-if="!isLastComment(index)" class="material-icons red-text text-darken-2 btn-clickable">delete</i>
            </td>
          </tr>
        </tbody>
      </table>

    </div>
    <div class="modal-footer">
      <a 
        href="#" 
        class="modal-action modal-close waves-effect waves-red btn-flat red-text" 
        @click="resetEditableArrays"
      >
        Cancel
      </a>
      <a
        @click="undoDelete()" 
        :disabled="stackIsEmpty" 
        class="modal-action waves-effect waves-yellow btn-flat yellow-text text-darken-3"
      >
        Undo
      </a>
      <a 
        href="#" class="modal-action modal-close waves-effect waves-green btn-flat green-text"
        @click="handleSaveEdits"
      >
        Save Changes
      </a>
    </div>
  </div>
</template>

<script>
module.exports = {
  props: {
    modalId: { type: String, required: true },
    rules: { type: Array, required: true },
    comments: { type: Array, required: true }
  },
  data() {
    return {
      editableRules: [],
      editableComments: [],
      deleteStack: []
    }
  },
  methods: {
    // ==================================================
    // shared/utilities functions
    // ==================================================
    deepCopy(arr) {
      return JSON.parse(JSON.stringify(arr))
    },
    deleteItem(item, index) {
      this.deleteStack.push({ item, index })

      function isItemToBeRemoved(candidateItem) {
        return item.id !== candidateItem.id
      }

      this.editableRules = this.editableRules.filter(isItemToBeRemoved)
      this.editableComments = this.editableComments.filter(isItemToBeRemoved)

      // var $toastContent = $('<span>I am toast content</span>').add(
      //     $('<button @click="undoDelete()" class="btn-flat toast-action">Undo</button>')
      // );
      // Materialize.toast($toastContent, 10000);
      //todo make this a toast
    },
    undoDelete() {
      let { item, index } = this.deleteStack.pop()
      if (item.pts) {
        //item is a rule
        this.editableRules.splice(index, 0, item)
      } else {
        //item is a comment
        this.editableComments.splice(index, 0, item)
      }
    },
    resetEditableArrays() {
      this.editableRules = this.deepCopy(this.rules)
      this.editableRules.push({ desc: '', pts: null, checked: false, id: generateID() })

      this.editableComments = this.deepCopy(this.comments)
      this.editableComments.push({ desc: '', id: generateID() })
    },
    handleSaveEdits() {
      const rules = this.deepCopy(this.editableRules)
      rules.pop()
      const comments = this.deepCopy(this.editableComments)
      comments.pop()

      this.$emit('save-edits', { rules, comments })
    },

    // ==================================================
    // rule functions
    // ==================================================
    isLastRule(index) {
      return index == this.editableRules.length - 1
    },
    // mutates rule in place
    handleRuleEdited(rule) {
      if (!!rule.pts) rule.pts = parseInt(rule.pts)

      // clean rule
      rule.desc = rule.desc.trim().replace(/\s+/g, ' ')
    },
    checkAddRule(ruleIndex) {
      if (this.isLastRule(ruleIndex)) this.editableRules.push({ desc: '', pts: null, checked: false })
    },

    // ==================================================
    // comment functions
    // ==================================================
    isLastComment(index) {
      return index == this.editableComments.length - 1
    },
    handleCommentEdited(comment) {
      comment.desc = comment.desc.trim().replace(/\s+/g, ' ')
    },
    checkAddComment(commentIndex) {
      if (this.isLastComment(commentIndex)) this.editableComments.push({ desc: '', pts: null })
    }
  },
  computed: {
    stackIsEmpty() {
      return !this.deleteStack.length
    }
  },
  created() {
    this.resetEditableArrays()
  }
}
</script>

<style scoped>
.tbl-col-sm {
  width: 100px;
}

.btn-clickable {
  cursor: pointer;
}
</style>
