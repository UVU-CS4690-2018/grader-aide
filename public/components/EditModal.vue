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
              <th style="width: 100px">test</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="(rule, index) of editableRules" :key="rule.id">
            <td><input type="number" v-model="rule.pts" @blur="handleRuleEdited(rule)" @keyup="checkAddRule(index)"></td>
            <td>
              <input type="text" v-model="rule.desc" @blur="handleRuleEdited(rule)" @keyup="checkAddRule(index)">
            </td>
            <td><i class="material-icons">delete</i></td>
          </tr>
          <!-- <tr> // fixme 
            <td><input type="text" placeholder="point value" v-model="createdRule.pts"></td>
            <td><input type="text" placeholder="rule name" v-model="createdRule.desc" @keyup="ruleCreated()"></td>
          </tr> -->
        </tbody>
      </table>

      <!-- editing comments -->
      <!-- <h4>Edit Comments</h4>
      <table>
        <thead>
          <tr>
              <th>Points</th>
              <th>Rule</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="comment of editableComments" :key="comment.id">
            <td><input type="number" v-model="rule.pts" @blur="cleanRuleAfterEdit(rule)"></td>
            <td><input type="text" v-model="rule.desc" @blur="cleanRuleAfterEdit(rule)"></td>
          </tr>
          <tr>
            <td><input type="text" placeholder="point value"></td>
            <td><input type="text" placeholder="rule name"></td>
          </tr>
        </tbody>
      </table> -->
    </div>
    <div class="modal-footer">
      <a href="#" class="modal-action modal-close waves-effect waves-green btn-flat">Confirm</a>
    </div>
  </div>
</template>

<script>
module.exports = {
    props: {
        modalId: { type: String, required: true },
        rules: { type: Array, required: true }
        // coments: { type: Array, required: true },
    },
    data() {
      return {
        editableRules: [],
        editableComments: [],
      }
    },
    methods: {
      deepCopy(arr) {
        return JSON.parse(JSON.stringify(arr))
      },
      // mutates rule in place
      handleRuleEdited(rule) {
        // clean pts
        // todo pts validation is not done yet but in progress
        // const invalidNumVal = /(?!(^-))\D+/g
        // const cleanPts = rule.pts.replace(invalidNumVal, '')
        // console.log(cleanPts)
        // rule.pts = parseInt(cleanPts)
        
        // clean rule
        rule.desc = rule.desc.trim().replace(/\s+/g, ' ')
      },
      checkAddRule(ruleIndex) {
        if(this.editableRules.length - 1 === ruleIndex) this.editableRules.push({ desc: '', pts: null })
      },
      ruleCreated() {
        this.editableRules.push(this.createdRule)

        this.createdRule = { desc: '', pts: null }
      }
    },
    created() {
      this.editableRules = this.deepCopy(this.rules)
      this.editableRules.push({ desc: '', pts: null })
    }
};
</script>
