const globalTweens = []

class Sequencer {
  constructor(mesh) {
    this.o = {returnToState: true};
    this.m = mesh;
    this.kf = []
    this.globalKeyFrameIndex = 0;
  }

  runAnimation() {
    setTimeout(function() {
      if (this.globalKeyFrameIndex > this.kf.length) return
      this.callTweenByIndex(this.globalKeyFrameIndex)
      this.kf[this.globalKeyFrameIndex][0].onEnd(()=> {
        this.globalKeyFrameIndex++
        runAnimation()
      })
    },this.kf[this.globalKeyFrameIndex][2])
  }
  setReturnToState(b) {
    this.o.returnToState = b;
  }

  createKeyFrame(state, milliseconds, to, easingCategory, easing) {
     const tween = new TWEEN.Tween(state, false)
     globalTweens.push(tween)
		tween.to(to, milliseconds) // Move to (300, 200) in 1 second.
		.easing(TWEEN.Easing[easingCategory][easing]) // Use an easing function to make the animation smooth.
		.onUpdate((stateUpdate) => {
			if (stateUpdate.position) {
        this.m.position.x = stateUpdate.position.x
        this.m.position.y = stateUpdate.position.y
        this.m.position.z = stateUpdate.position.z
      }
		})

    this.kf.push([tween, to, delayAfter])
  }

  callTweenByIndex(i) {
    this.kf[i][0].start()
  }

  getChild(n) {
    return new Sequencer(this.m.children[n]);
  }
}

const Animatoid = {
  Sequencer: Sequencer
}
