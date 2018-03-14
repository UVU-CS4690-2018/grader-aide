<template>
  <div :id="modalId" class="modal">
    <div class="modal-content">
      <!-- editing rules -->
      <h4>Edit Rules</h4>
      <table>
        <thead>
          <tr>
              <!-- // todo fix widths into classes -->
              <th style="width: 100px">Points</th>
              <th>Rule</th>
              <th style="width: 100px"></th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="(rule, index) of editableRules" :key="rule.id">
            <td><input type="number" v-model="rule.pts" @blur="handleRuleEdited(rule)" @keyup="checkAddRule(index)"></td>
            <td>
              <input type="text" v-model="rule.desc" @blur="handleRuleEdited(rule)" @keyup="checkAddRule(index)">
            </td>
            <td @click="deleteItem(rule, index)" ><i v-if="!isLastRule(index)" class="material-icons">delete</i></td>
          </tr>
        </tbody>
      </table>

      <!-- editing comments -->
      <h4>Edit Comment</h4>
      <table>
        <thead>
          <tr>
              <!-- // todo fix widths into classes -->
              <th>Description</th>
              <th style="width: 100px"></th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="(comment, index) of editableComments" :key="comment.id">
            <td>
              <input type="text" v-model="comment.desc" @blur="handleCommentEdited(comment)" @keyup="checkAddComment(index)">
            </td>
            <td @click="deleteItem(comment, index)" ><i v-if="!isLastComment(index)" class="material-icons">delete</i></td>
          </tr>
        </tbody>
      </table>

    </div>
    <div class="modal-footer">
      <a @click="undoDelete()" class="modal-action waves-effect waves-green btn-flat">Undo</a>
      <a href="#" class="modal-action modal-close waves-effect waves-green btn-flat">Confirm</a>
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
        };
    },
    methods: {
        deepCopy(arr) {
            return JSON.parse(JSON.stringify(arr));
        },
        isLastRule(index) {
            return index == this.editableRules.length - 1;
        },
        isLastComment(index) {
            return index == this.editableComments.length - 1;
        },
        deleteItem(item, index) {
            this.deleteStack.push({ item, index });
            console.log('removed item: ', item.desc);
            const isItemToBeRemoved = function(candidateItem) {
                return item.id !== candidateItem.id;
            };

            this.editableRules = this.editableRules.filter(isItemToBeRemoved);
            this.editableComments = this.editableComments.filter(isItemToBeRemoved);

            // var $toastContent = $('<span>I am toast content</span>').add(
            //     $('<button @click="undoDelete()" class="btn-flat toast-action">Undo</button>')
            // );
            // Materialize.toast($toastContent, 10000);
            //todo make this a toast
        },
        undoDelete() {
            let { item, index } = this.deleteStack.pop();
            if (item.pts) {
                //item is a rule
                this.editableRules.splice(index, 0, item);
            } else {
                //item is a comment
                this.editableComments.splice(index, 0, item);
            }
        },
        // mutates rule in place
        handleRuleEdited(rule) {
            rule.pts = parseInt(cleanPts);
            console.log('rule.pts: ', rule.pts);

            // clean rule
            rule.desc = rule.desc.trim().replace(/\s+/g, ' ');
        },
        handleCommentEdited(comment) {
            comment.desc = comment.desc.trim().replace(/\s+/g, ' ');
        },

        checkAddRule(ruleIndex) {
            if (this.isLastRule(ruleIndex)) this.editableRules.push({ desc: '', pts: null });
        },
        checkAddComment(commentIndex) {
            if (this.isLastRule(ruleIndex)) this.editableRules.push({ desc: '', pts: null });
        },
        ruleCreated() {
            this.editableRules.push(this.createdRule);

            this.createdRule = { desc: '', pts: null, id: generateID() };
        }
    },
    created() {
        this.editableRules = this.deepCopy(this.rules);
        this.editableRules.push({ desc: '', pts: null, id: generateID() });

        this.editableComments = this.deepCopy(this.comments);
        this.editableComments.push({ desc: '', id: generateID() });
    }
};
</script>
